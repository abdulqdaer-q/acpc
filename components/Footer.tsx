export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">ACPC</p>
          <p className="text-gray-400 mb-4">
            Aleppo Competitive Programming Competition
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ACPC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
