import React, { useState, useEffect } from 'react';
import { ExchangePost, Theme } from '../types';
import { INITIAL_EXCHANGE_POSTS } from '../constants';
import { Send, User, RefreshCw, MessageSquare, Image as ImageIcon, Search } from 'lucide-react';
import { ContactModal } from './ContactModal';
import { ExchangeDetailModal } from './ExchangeDetailModal';

interface ExchangeProps {
  currentTheme?: Theme;
}

export const Exchange: React.FC<ExchangeProps> = ({ currentTheme = 'EFSF' }) => {
  const [posts, setPosts] = useState<ExchangePost[]>(() => {
    const saved = localStorage.getItem('exchange_posts');
    return saved ? JSON.parse(saved) : INITIAL_EXCHANGE_POSTS;
  });

  const [formData, setFormData] = useState({
    author: '',
    have: '',
    want: '',
    condition: 'New (In Box)' as ExchangePost['condition'],
    image: '',
    description: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<ExchangePost | null>(null);
  const [contactTarget, setContactTarget] = useState<{ pilot: string, item: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('exchange_posts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: ExchangePost = {
      id: Date.now().toString(),
      author: formData.author,
      have: formData.have,
      want: formData.want,
      condition: formData.condition,
      date: new Date().toLocaleDateString(),
      image: formData.image,
      description: formData.description,
      status: 'Open',
      comments: []
    };
    setPosts([newPost, ...posts]);
    setFormData({ author: '', have: '', want: '', condition: 'New (In Box)', image: '', description: '' });
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...(post.comments || []),
            {
              id: Date.now().toString(),
              author: 'Guest Pilot', // In a real app this would be the logged in user
              text,
              date: new Date().toLocaleDateString()
            }
          ]
        };
      }
      return post;
    }));

    // Update the selected post view as well to show the new comment immediately
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? ({
        ...prev,
        comments: [
          ...(prev.comments || []),
          {
            id: Date.now().toString(),
            author: 'Guest Pilot',
            text,
            date: new Date().toLocaleDateString()
          }
        ]
      }) : null);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.have.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.want.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isZeon = currentTheme === 'ZEON';
  const accentColor = isZeon ? 'text-yellow-500' : 'text-gundam-blue';
  const buttonClass = isZeon
    ? 'bg-red-900 hover:bg-red-800 text-yellow-500 border border-yellow-600'
    : 'bg-gundam-blue hover:bg-blue-700 text-white border border-transparent';
  const cardBorderClass = isZeon ? 'border-red-900 hover:border-yellow-500/50' : 'border-slate-700 hover:border-gundam-blue/50';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-display font-bold mb-4 ${isZeon ? 'text-red-500' : 'text-white'}`}>Exchange Center</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Trade your Gunpla with other builders. Connect, negotiate, and expand your collection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post Form */}
        <div className={`p-6 border rounded-lg lg:col-span-1 h-fit sticky top-24 transition-colors ${isZeon ? 'bg-red-950/30 border-red-900' : 'bg-slate-800/50 border-slate-700'}`}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Send className={`mr-2 ${accentColor}`} />
            Create Listing
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Pilot Name</label>
              <input
                required
                type="text"
                className={`w-full bg-slate-900 border rounded p-2 text-white outline-none focus:border-opacity-100 transition-colors ${isZeon ? 'border-red-900 focus:border-yellow-500' : 'border-slate-600 focus:border-gundam-blue'}`}
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Have (Offering)</label>
              <input
                required
                type="text"
                className={`w-full bg-slate-900 border rounded p-2 text-white outline-none focus:border-opacity-100 transition-colors ${isZeon ? 'border-red-900 focus:border-yellow-500' : 'border-slate-600 focus:border-gundam-blue'}`}
                value={formData.have}
                onChange={e => setFormData({ ...formData, have: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Want (Looking For)</label>
              <input
                required
                type="text"
                className={`w-full bg-slate-900 border rounded p-2 text-white outline-none focus:border-opacity-100 transition-colors ${isZeon ? 'border-red-900 focus:border-yellow-500' : 'border-slate-600 focus:border-gundam-blue'}`}
                value={formData.want}
                onChange={e => setFormData({ ...formData, want: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Image URL (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  className={`w-full bg-slate-900 border rounded p-2 pl-9 text-white outline-none focus:border-opacity-100 transition-colors ${isZeon ? 'border-red-900 focus:border-yellow-500' : 'border-slate-600 focus:border-gundam-blue'}`}
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
                <ImageIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
              <textarea
                className={`w-full bg-slate-900 border rounded p-2 text-white outline-none focus:border-opacity-100 transition-colors resize-none h-24 ${isZeon ? 'border-red-900 focus:border-yellow-500' : 'border-slate-600 focus:border-gundam-blue'}`}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Details about condition, extras, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Condition</label>
              <select
                className={`w-full bg-slate-900 border rounded p-2 text-white outline-none focus:border-opacity-100 transition-colors ${isZeon ? 'border-red-900 focus:border-yellow-500' : 'border-slate-600 focus:border-gundam-blue'}`}
                value={formData.condition}
                onChange={e => setFormData({ ...formData, condition: e.target.value as any })}
              >
                <option>New (In Box)</option>
                <option>Built (With Box)</option>
                <option>Built (No Box)</option>
                <option>Custom Painted</option>
              </select>
            </div>
            <button
              type="submit"
              className={`w-full font-bold py-3 rounded uppercase tracking-wider transition-colors ${buttonClass}`}
            >
              Post Request
            </button>
          </form>
        </div>

        {/* Listings Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <h3 className="text-xl font-bold text-white">Recent Listings</h3>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-slate-800 border rounded px-4 py-2 pl-10 text-sm text-white outline-none focus:border-opacity-100 ${isZeon ? 'border-red-900 focus:border-yellow-500' : 'border-slate-700 focus:border-gundam-blue'}`}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {filteredPosts.map(post => {
            const isFed = post.author.includes('Amuro') || post.author.includes('Banagher') || post.author.includes('Kira');
            const cardBorder = isZeon ? 'border-red-900/30 hover:border-red-600' : 'border-slate-700 hover:border-gundam-blue';

            return (
              <div key={post.id} className={`bg-slate-900/50 backdrop-blur border ${cardBorder} p-5 group transition-all duration-300 hover:shadow-lg relative overflow-hidden rounded-sm`}>
                {/* Scanline overlay for card */}
                <div className="absolute inset-0 bg-scanline bg-[length:100%_2px] opacity-10 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 ${isZeon ? 'bg-red-900 border-red-600 text-yellow-500' : 'bg-blue-900 border-gundam-blue text-white'}`}>
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{post.author}</h3>
                      <div className="flex items-center text-xs text-slate-500">
                        {post.date}
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${post.status === 'Open' ? 'border-green-500/50 text-green-400' :
                      post.status === 'Pending' ? 'border-yellow-500/50 text-yellow-400' :
                        'border-red-500/50 text-red-500'
                    }`}>
                    {post.status}
                  </div>
                </div>

                <div className="flex gap-4 relative z-10 mb-4">
                  {/* Post Image Thumbnail */}
                  {post.image && (
                    <div className="w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden border border-slate-700 relative group-hover:border-slate-500 transition-colors">
                      <img src={post.image} alt="Exchange Item" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}

                  <div className="flex-grow space-y-2">
                    <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase mt-0.5">Have</span>
                      <p className={`font-mono text-sm font-bold text-right ${isZeon ? 'text-yellow-500' : 'text-gundam-blue'}`}>{post.have}</p>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase mt-0.5">Want</span>
                      <p className="font-mono text-sm font-bold text-gundam-red text-right">{post.want}</p>
                    </div>
                  </div>
                </div>

                {post.description && (
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 italic pl-2 border-l-2 border-slate-700">
                    "{post.description}"
                  </p>
                )}

                <div className="flex gap-2 relative z-10 pt-4 border-t border-slate-800/50">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-sm text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3 h-3" />
                    Comms ({post.comments?.length || 0})
                  </button>
                  <button
                    onClick={() => setContactTarget({ pilot: post.author, item: post.have })}
                    className={`flex-1 py-2 rounded-sm text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 border ${isZeon
                        ? 'bg-red-900/10 hover:bg-red-600 text-red-500 hover:text-white border-red-600/50'
                        : 'bg-gundam-blue/10 hover:bg-gundam-blue text-gundam-blue hover:text-white border-gundam-blue/50'
                      }`}
                  >
                    <Send className="w-3 h-3" /> Contact
                  </button>
                </div>
              </div>
            );
          })}
          {filteredPosts.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 border border-dashed border-slate-700 rounded">
              <p>No comms found matching criteria.</p>
            </div>
          )}
        </div>
      </div>

      <ContactModal
        isOpen={!!contactTarget}
        onClose={() => setContactTarget(null)}
        pilotName={contactTarget?.pilot || ''}
        itemName={contactTarget?.item || ''}
        theme={currentTheme}
      />

      <ExchangeDetailModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        onAddComment={handleAddComment}
        onContact={() => {
          if (selectedPost) {
            setContactTarget({ pilot: selectedPost.author, item: selectedPost.have });
            setSelectedPost(null);
          }
        }}
        theme={currentTheme}
      />
    </div>
  );
};