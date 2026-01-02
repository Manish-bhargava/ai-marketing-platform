const User = require('../../models/User'); 
const Job = require('../../models/job');   
 // Make sure you have `npm install node-fetch`

// (Your 'generateContent' function goes here - no changes needed)
const generateContent = async (req, res) => {
  let jobId = null;
  
  try {
    // 1. CHECK USER AND INPUT
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const userId = req.user.id;
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Prompt must be at least 10 characters' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 2. GET USER'S PLATFORMS
    const platformsToGenerate = user.platforms; 
    if (!platformsToGenerate || platformsToGenerate.length === 0) {
      return res.status(400).json({ success: false, message: 'No platforms selected' });
    }

    // 3. CREATE JOB IN DATABASE
    const job = new Job({
      userId: userId,
      platforms: platformsToGenerate,
      originalContent: prompt,
      status: 'processing'
    });
    await job.save();
    jobId = job._id;

    console.log(`Job ${jobId} created for platforms: ${platformsToGenerate.join(', ')}`);

    // 4. GENERATE CONTENT USING AI
    const generatedContent = await callAIAndGenerateContent(jobId, prompt, user, platformsToGenerate);

    // 5. SAVE RESULTS TO JOB
    const finishedJob = await Job.findByIdAndUpdate(jobId, {
      status: 'completed',
      generatedContent: generatedContent,
      completedAt: new Date()
    }, { new: true });

    // 6. SEND SUCCESS RESPONSE
    res.status(200).json({
      success: true,
      message: 'Content generated successfully!',
      job: finishedJob
    });

  } catch (error) {
    console.error(`Job ${jobId} failed:`, error.message);
    
    // MARK JOB AS FAILED IF ERROR
    if (jobId) {
      await Job.findByIdAndUpdate(jobId, { 
        status: 'failed', 
        error: error.message 
      });
    }

    res.status(500).json({
      success: false,
      message: 'Content generation failed',
      error: error.message
    });
  }
};


/**
 * -----------------------------------------------------------------
 * THIS IS THE FIXED FUNCTION
 * -----------------------------------------------------------------
 */
const callAIAndGenerateContent = async (jobId, prompt, user, platformsToGenerate) => {
  
  // CREATE PROMPT FOR AI (No changes here, this is good)
  const fullPrompt = `
    Create marketing content for these platforms: ${platformsToGenerate.join(', ')}
    Company: ${user.companyName || 'Our Company'}
    Brand Tone: ${user.brandVoice?.tone || 'professional'}
    
    User's Request: "${prompt}"
    
    Return ONLY JSON format with these keys: ${platformsToGenerate.join(', ')}
    
    For Twitter: array of tweet objects with text and image_url
    For LinkedIn: array of post strings  
    For Email: object with subject and body
    For Blog: object with title and content
    For Instagram: object with caption and image_url
  `;

  // ---
  // ✅ FIX 1: Changed to the correct, modern Gemini model URL
  // ---
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
  const response = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      // ---
      // ✅ FIX 2: Added back generationConfig to force JSON output
      // This prevents your JSON.parse() from failing.
      // ---
      generationConfig: { 
        responseMimeType: "application/json" 
      }
    })
  });
 
  if (!response.ok) {
    // This will now give a more useful error if it's not a 404
    const errText = await response.text();
    throw new Error(`AI API Error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0].content) {
    throw new Error("AI returned empty response");
  }

  // PARSE AI RESPONSE
  // This will now work perfectly because of FIX 2
  const rawText = data.candidates[0].content.parts[0].text;
  let generatedContent = JSON.parse(rawText);

  // ADD IMAGES IF NEEDED (No changes here, this is good)
  const needsImage = platformsToGenerate.includes('twitter') || platformsToGenerate.includes('instagram');
  
  if (needsImage) {
    const imagePrompt = `professional marketing image for: ${prompt}`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=1080&height=1080`;
    
    generatedContent.imageUrl = imageUrl;

    // ADD IMAGE TO TWITTER AND INSTAGRAM POSTS
    if (generatedContent.twitter && generatedContent.twitter[0]) {
      generatedContent.twitter[0].image_url = imageUrl;
    }
    if (generatedContent.instagram) {
      generatedContent.instagram.image_url = imageUrl;
    }
  }

  return generatedContent;
};

module.exports = {
  generateContent
};