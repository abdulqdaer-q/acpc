export default function Competition() {
  return (
    <section id="competition" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Competition Format
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding how the competition works and what to expect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contest Rules</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Teams of 1-3 members
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                5-hour competition duration
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                8-12 algorithmic problems
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                One computer per team
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Standard programming languages supported (C++, Java, Python)
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Who Can Participate?
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                University students (undergraduate and graduate)
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                High school students with programming experience
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Passionate programmers and problem solvers
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Open to all skill levels
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                No age restrictions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
