import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Users,
  LogOut,
  Users2,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'ダッシュボード', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: '講座管理', href: '/admin/courses', icon: BookOpen },
    { name: 'クイズ管理', href: '/admin/quizzes', icon: HelpCircle },
    { name: 'ユーザー管理', href: '/admin/users', icon: Users },
    { 
      name: 'アフィリエイト管理', 
      icon: Users2, 
      submenu: [
        { name: 'アフィリエイター一覧', href: '/admin/affiliate/list' },
        { name: 'リンク発行', href: '/admin/affiliate/links' },
        { name: '成果トラッキング', href: '/admin/affiliate/tracking' },
        { name: '報酬管理', href: '/admin/affiliate/rewards' }
      ]
    },
  ];

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const handleMenuClick = (menuName: string) => {
    toggleMenu(menuName);
    // アフィリエイト管理の親メニューは閉じない
    if (menuName === 'アフィリエイト管理') {
      return;
    }
    // その他のメニューはスマホでは閉じる
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        setSidebarOpen(false);
      }, 300); // アニメーション完了後に閉じる
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(item => isActive(item.href));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* モバイルサイドバーオーバーレイ */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* サイドバー */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-center border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">管理者パネル</h1>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isExpanded = expandedMenus.includes(item.name);
              const isSubmenuItemActive = hasSubmenu ? isSubmenuActive(item.submenu!) : false;

              return (
                <li key={item.name}>
                  {hasSubmenu ? (
                    <div>
                      <button
                        onClick={() => handleMenuClick(item.name)}
                        className={`group w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isSubmenuItemActive
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center">
                          <Icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {isExpanded && (
                        <ul className="mt-2 ml-6 space-y-1">
                          {item.submenu!.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                to={subItem.href}
                                onClick={closeSidebar}
                                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                  isActive(subItem.href)
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href!}
                      onClick={closeSidebar}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.href!)
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ログアウトボタン */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button 
            onClick={closeSidebar}
            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            ログアウト
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="lg:pl-64">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* モバイルメニューボタン */}
                <button
                  type="button"
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="ml-2 lg:ml-0">
                  <h2 className="text-lg font-medium text-gray-900">
                    {(() => {
                      const currentItem = navigation.find(item => 
                        item.href ? isActive(item.href) : 
                        item.submenu ? isSubmenuActive(item.submenu) : false
                      );
                      if (currentItem?.submenu) {
                        const activeSubItem = currentItem.submenu.find(subItem => isActive(subItem.href));
                        return activeSubItem?.name || currentItem.name;
                      }
                      return currentItem?.name || 'ダッシュボード';
                    })()}
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 hidden sm:block">管理者</span>
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ページコンテンツ */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 