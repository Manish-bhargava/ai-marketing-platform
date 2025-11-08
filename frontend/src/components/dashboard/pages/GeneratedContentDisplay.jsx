import React from 'react';
import { 
  MessageSquare, Heart, Repeat, Share, MoreHorizontal, 
  ThumbsUp, MessageCircle, Share2, Send,
  User, AtSign, Mail
} from 'lucide-react';

// --- NEW Loading Placeholder ---
const ImageLoadingPlaceholder = ({ className = "" }) => (
  <div 
    className={`flex w-full items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse ${className}`}
  >
    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
      Generating Image...
    </span>
  </div>
);

// --- Mockup Components ---

const TwitterMockup = ({ content, imageUrl, isImageLoading }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-black max-w-md mx-auto w-full">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
          <User className="h-6 w-6 text-gray-500" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-900 dark:text-white">Your Company</span>
            <span className="text-blue-500">
              <svg viewBox="0 0 24 24" aria-label="Verified account" className="h-4 w-4 fill-current"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.866.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-6.034 6.014-2.984-2.98c-.17-.17-.45-.17-.62 0-.17.17-.17.446 0 .617l3.29 3.29c.086.083.2.128.316.128.116 0 .23-.045.316-.128l6.336-6.324c.17-.17.17-.446 0-.617-.17-.17-.446-.17-.617 0z"></path></g></svg>
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400">@yourhandle · 1h</span>
        </div>
      </div>
      <MoreHorizontal className="h-5 w-5 text-gray-500" />
    </div>

    {/* Content */}
    <div className="mt-3 text-[15px] text-gray-900 dark:text-white whitespace-pre-wrap leading-normal">
      {content}
    </div>

    {/* Image Attachment */}
    {imageUrl ? (
      <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
        <img src={imageUrl} alt="Tweet attachment" className="h-auto w-full object-cover" loading="lazy" />
      </div>
    ) : isImageLoading ? (
      <ImageLoadingPlaceholder className="mt-3 h-48 rounded-2xl" />
    ) : null}

    {/* Footer / Metrics */}
    <div className="mt-4 flex justify-between text-gray-500 dark:text-gray-400 max-w-md">
      <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors"><MessageSquare className="h-[18px] w-[18px]" /><span className="text-sm">12</span></div>
      <div className="flex items-center gap-1 hover:text-green-500 cursor-pointer transition-colors"><Repeat className="h-[18px] w-[18px]" /><span className="text-sm">8</span></div>
      <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors"><Heart className="h-[18px] w-[18px]" /><span className="text-sm">42</span></div>
      <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors"><Share className="h-[18px] w-[18px]" /></div>
    </div>
  </div>
);

const LinkedInMockup = ({ content, imageUrl, isImageLoading }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 max-w-md mx-auto w-full overflow-hidden">
    {/* Header */}
    <div className="flex items-start justify-between p-3">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
          <User className="h-7 w-7 text-gray-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Your Name</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Marketing Manager • 2h • <span className="inline-block ml-1">🌐</span></p>
        </div>
      </div>
      <MoreHorizontal className="h-5 w-5 text-gray-500 cursor-pointer" />
    </div>

    {/* Content */}
    <div className="px-3 pb-3 text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap leading-relaxed">
      {content}
      <span className="text-gray-500 cursor-pointer ml-1 font-medium hover:text-blue-500">...see more</span>
    </div>

    {/* Image Attachment */}
    {imageUrl ? (
      <div className="w-full bg-gray-100 dark:bg-gray-800">
        <img src={imageUrl} alt="Post media" className="h-auto w-full object-cover max-h-[400px]" loading="lazy" />
      </div>
    ) : isImageLoading ? (
      <ImageLoadingPlaceholder className="h-64 max-h-[400px] rounded-none" />
    ) : null}

    {/* Social Counts */}
    <div className="px-3 py-2 flex items-center text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
      <ThumbsUp className="h-3 w-3 mr-1 fill-blue-500 text-blue-500" />
      <Heart className="h-3 w-3 mr-1 fill-red-500 text-red-500 -ml-0.5" />
      <span>You and 34 others • 5 comments</span>
    </div>

    {/* Footer / Actions */}
    <div className="px-2 py-1 flex justify-between">
      <button className="flex items-center justify-center gap-1 flex-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-500 font-semibold text-sm transition-colors">
        <ThumbsUp className="h-5 w-5" /> <span className="hidden sm:inline">Like</span>
      </button>
      <button className="flex items-center justify-center gap-1 flex-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-500 font-semibold text-sm transition-colors">
        <MessageCircle className="h-5 w-5" /> <span className="hidden sm:inline">Comment</span>
      </button>
      <button className="flex items-center justify-center gap-1 flex-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-500 font-semibold text-sm transition-colors">
        <Share2 className="h-5 w-5" /> <span className="hidden sm:inline">Repost</span>
      </button>
      <button className="flex items-center justify-center gap-1 flex-1 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-500 font-semibold text-sm transition-colors">
        <Send className="h-5 w-5" /> <span className="hidden sm:inline">Send</span>
      </button>
    </div>
  </div>
);

const EmailMockup = ({ subject, body }) => (
  <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm dark:border-gray-800 dark:bg-gray-900 max-w-md mx-auto w-full">
    {/* Email Window Header */}
    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>
      <span className="text-xs text-gray-500 ml-2 flex items-center gap-1 font-medium"><Mail className="h-3.5 w-3.5" /> New Message</span>
    </div>

    {/* Email Fields */}
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex border-b border-gray-100 dark:border-gray-800 pb-2">
          <span className="text-gray-500 text-sm w-16">To:</span>
          <span className="text-gray-900 dark:text-gray-200 text-sm bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded text-xs font-medium">Subscribers</span>
        </div>
        <div className="flex border-b border-gray-100 dark:border-gray-800 pb-2">
          <span className="text-gray-500 text-sm w-16">Subject:</span>
          <span className="font-semibold text-gray-900 dark:text-white text-sm flex-1">{subject}</span>
        </div>
      </div>

      {/* Email Body */}
      <div className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed bg-gray-50 dark:bg-gray-950/50 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
        {body}
      </div>
    </div>
  </div>
);

const BlogMockup = ({ content, imageUrl, isImageLoading }) => (
  <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm dark:border-gray-800 dark:bg-gray-900 max-w-md mx-auto w-full flex flex-col">
    {/* Browser Mock Header */}
    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2.5 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-700 rounded-md h-6 text-[11px] flex items-center px-3 text-gray-400 truncate font-mono">
        https://yourcompany.com/blog/new-post
      </div>
    </div>

    {/* Hero Image */}
    {imageUrl ? (
      <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
        <img src={imageUrl} alt="Blog Hero" className="w-full h-full object-cover absolute inset-0" loading="lazy" />
      </div>
    ) : isImageLoading ? (
      <ImageLoadingPlaceholder className="aspect-video rounded-none" />
    ) : (
      <div className="aspect-video w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6 text-center">
        <span className="text-white/80 font-bold text-2xl">Amazing Blog Post</span>
      </div>
    )}

    {/* Blog Content */}
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
          <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">Content Team</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Published today • 5 min read</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        The Future of Industry: Our Latest Innovation
      </h2>

      <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>{content}</p>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        <button className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline flex items-center gap-1">
          Read full article →
        </button>
      </div>
    </div>
  </div>
);


// --- Main Display Component ---

const GeneratedContentDisplay = ({ content, isImageLoading }) => {
  if (!content) return null;

  return (
    <div className="rounded-lg bg-gray-50 p-6 md:p-8 dark:bg-gray-950/50 border border-gray-200/50 dark:border-gray-800/50">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
        <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 p-1.5 rounded-md">✨</span>
        Preview
      </h3>

      {/* Grid for Mockups */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 justify-items-center">

        {/* Twitter/X */}
        {content.twitter && (
          <div className="w-full flex flex-col items-center">
            <span className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
              <AtSign className="h-3.5 w-3.5" /> Twitter / X
            </span>
            <TwitterMockup 
              content={content.twitter} 
              imageUrl={content.imageUrl} 
              isImageLoading={isImageLoading} 
            />
          </div>
        )}

        {/* LinkedIn */}
        {content.linkedin && (
          <div className="w-full flex flex-col items-center">
            <span className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
              Linked<span className="bg-[#0a66c2] text-white rounded-[3px] px-1 font-bold text-[11px] leading-4 inline-flex items-center justify-center h-4">in</span>
    _       </span>
            <LinkedInMockup 
              content={content.linkedin} 
              imageUrl={content.imageUrl} 
              isImageLoading={isImageLoading} 
            />
          </div>
        )}

        {/* Email */}
        {content.email && (
          <div className="w-full flex flex-col items-center">
            <span className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
              <Mail className="h-3.5 w-3.5" /> Email Newsletter
            </span>
            <EmailMockup subject={content.email.subject} body={content.email.body} />
          </div>
        )}

        {/* Blog */}
        {content.blog && (
          <div className="w-full flex flex-col items-center">
            <span className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-gray-900 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
              <MessageSquare className="h-3.5 w-3.5" /> Blog Post
            </span>
            <BlogMockup 
              content={content.blog} 
              imageUrl={content.imageUrl} 
              isImageLoading={isImageLoading} 
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default GeneratedContentDisplay;