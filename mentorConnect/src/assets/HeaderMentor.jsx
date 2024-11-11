import { BookOpen, Calendar, Home, Users } from 'lucide-react';

const Header = () => {
  const navItems = [
    { name: 'Home', icon: <Home size={20} />, href: '/mentor-home' },
    { name: 'Profile', icon: <Users size={20} />, href: '/profile' },
    { name: 'Schedule Classes', icon: <BookOpen size={20} />, href: '/schedule-class' },
    { name: 'Class Requests', icon: <Calendar size={20} />, href: '/class-request-dashboard' },
    { name: 'Upcoming Classes', icon: <Calendar size={20} />, href: '/scheduled-class' },
    { name: 'Scheduled Requested Classes', icon: <Calendar size={20} />, href: '/requested-classes-join' },

  ];
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">LearnHub</span>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                <span className="text-gray-500 group-hover:text-indigo-600">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;