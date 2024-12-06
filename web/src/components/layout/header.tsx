import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold">Workshop Starter</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-gray-900">
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}