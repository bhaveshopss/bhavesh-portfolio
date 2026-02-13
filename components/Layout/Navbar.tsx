import React from 'react';
import { TubelightNavbar } from '../ui/TubelightNavbar';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Briefcase, Zap, Layers, User, FileText, Share2, Linkedin, Github, Mail, Download } from 'lucide-react';

const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Work', url: '#work', icon: Briefcase },
    { name: 'Stack', url: '#infrastructure', icon: Layers },
    { name: 'About', url: '#about', icon: User },
    { name: 'Blog', url: '#blog', icon: FileText },
    {
      name: 'Connect',
      url: '#contact',
      icon: Share2,
      items: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bhaveshops/', icon: Linkedin },
        { name: 'GitHub', url: 'https://github.com/bhaveshopss', icon: Github },
        { name: 'Gmail', url: 'mailto:workwithbhavesh@gmail.com', icon: Mail },
        {
          name: 'Resume',
          url: '/Bhavesh_Devops_Resume.pdf',
          icon: Download,
          className: "text-primary dark:text-terminal-green font-bold bg-primary/5 dark:bg-terminal-green/10 border border-primary/20 dark:border-terminal-green/20 hover:bg-primary/10 dark:hover:bg-terminal-green/20"
        }
      ]
    }
  ];

  return (
    <>
      {/* Top Left: Brand Name — vertically centered with navbar */}
      <div className="fixed top-6 left-6 z-[60] flex items-center transition-opacity duration-500">
        <a href="#home" className="font-display font-bold tracking-tight text-xl text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors cursor-interactive">
          Bhavesh<span className="text-primary">ops</span>
        </a>
      </div>

      {/* Top Center/Bottom Center: Tubelight Navigation */}
      <TubelightNavbar items={navItems} />

      {/* Top Right: Theme Toggle */}
      <div className="fixed top-6 right-16 md:right-20 z-[60]">
        <ThemeToggle />
      </div>
    </>
  );
};

export default Navbar;