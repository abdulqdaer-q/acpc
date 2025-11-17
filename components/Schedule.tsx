export default function Schedule() {
  const events = [
    {
      time: '8:00 AM',
      title: 'Registration & Check-in',
      description: 'Teams arrive and complete registration',
    },
    {
      time: '9:00 AM',
      title: 'Opening Ceremony',
      description: 'Welcome address and competition rules',
    },
    {
      time: '10:00 AM',
      title: 'Competition Begins',
      description: '5-hour programming challenge starts',
    },
    {
      time: '12:00 PM',
      title: 'Lunch Break',
      description: 'Provided for all participants',
    },
    {
      time: '3:00 PM',
      title: 'Competition Ends',
      description: 'Final submissions and system freeze',
    },
    {
      time: '4:00 PM',
      title: 'Awards Ceremony',
      description: 'Winners announced and prizes awarded',
    },
  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Event Schedule
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan your day with our detailed competition timeline.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex items-start bg-gray-50 p-6 rounded-lg hover:shadow-md transition"
              >
                <div className="flex-shrink-0 w-24 text-primary-600 font-bold">
                  {event.time}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
