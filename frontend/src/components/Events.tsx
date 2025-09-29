import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import eventsImage from '@/assets/campus-events.jpg';

const Events = () => {
  const upcomingEvents = [
    {
      title: 'Leadership Workshop Series',
      date: 'Oct 15, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'Student Union Building',
      attendees: 45,
      category: 'Workshop',
      description: 'Develop essential leadership skills through interactive sessions and peer collaboration.'
    },
    {
      title: 'Community Service Day',
      date: 'Oct 22, 2024', 
      time: '9:00 AM - 4:00 PM',
      location: 'Local Community Center',
      attendees: 80,
      category: 'Service',
      description: 'Join us for a day of giving back to our local community through various volunteer activities.'
    },
    {
      title: 'Networking Night',
      date: 'Nov 5, 2024',
      time: '7:00 PM - 9:00 PM', 
      location: 'Campus Conference Center',
      attendees: 120,
      category: 'Networking',
      description: 'Connect with alumni, faculty, and fellow students in a professional networking environment.'
    }
  ];

  const pastEvents = [
    'Annual Fundraising Gala - $15,000 raised',
    'Study Abroad Information Fair - 200+ attendees',
    'Mental Health Awareness Week - Campus-wide impact',
    'Career Fair Preparation Workshop - 150+ students'
  ];

  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-primary">Events & Activities</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From leadership workshops to community service projects, we host engaging events 
            throughout the year that foster growth, connection, and positive impact.
          </p>
        </div>

        {/* Featured Event Banner */}
        <div className="mb-16 relative rounded-2xl overflow-hidden shadow-elegant">
          <div 
            className="h-64 md:h-80 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${eventsImage})` }}
          >
            <div className="absolute inset-0 bg-primary/70"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Annual Student Summit 2024</h3>
                <p className="text-xl mb-6 text-white/90">December 10-12 | University Convention Center</p>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Register Now
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="card-gradient shadow-elegant card-hover border-0">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {event.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-accent" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-accent" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <Button className="w-full hero-gradient text-white border-0">
                    RSVP Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events Highlights */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">Recent Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-2 h-2 hero-gradient rounded-full"></div>
                <span className="text-muted-foreground">{event}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              View All Past Events
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;