// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowRight, Shield, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

// --- Types ---


interface TimelineEvent {
  date: string; // ISO date for logic
  displayDate: string; // "Feb 23"
  weekNum: number;
  units: {
    unitId: number;
    tasks: string[];
  }[];
}

// --- Data ---



const TIMELINE: TimelineEvent[] = Array.from({ length: 140 }, (_, i) => {
  const startDate = new Date(2026, 1, 20); // Feb 20, 2026
  const eventDate = new Date(startDate);
  eventDate.setDate(startDate.getDate() + i);

  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  const displayDate = eventDate.toLocaleDateString('en-US', options);


  const units = [];

  /* 
    Schedule Pattern:
    Start Date: Feb 20 (Index 0)
    Unit 1: 
      - Clear Patio: Feb 22 (Index 2)
      - Power Wash: Feb 25 (Index 5)
      - Paint: Mar 4 (Index 12)
    Subsequent units shift by +7 days.
  */

  // Unit 1 (Paint: Mar 4, i=12)
  if (i === 1 || i === 2) units.push({ unitId: 1, tasks: ["Clear Patio"] });
  if (i === 6 || i === 7) units.push({ unitId: 1, tasks: ["Power Wash"] });
  if (i >= 12 && i <= 21) units.push({ unitId: 1, tasks: ["Paint"] });

  // Unit 2 (Paint: Mar 16, i=24)
  if (i === 15 || i === 16) units.push({ unitId: 2, tasks: ["Clear Patio"] });
  if (i === 20 || i === 21) units.push({ unitId: 2, tasks: ["Power Wash"] });
  if (i >= 24 && i <= 33) units.push({ unitId: 2, tasks: ["Paint"] });

  // Unit 3 (Paint: Mar 26, i=34)
  if (i === 22 || i === 23) units.push({ unitId: 3, tasks: ["Clear Patio"] });
  if (i === 27 || i === 28) units.push({ unitId: 3, tasks: ["Power Wash"] });
  if (i >= 34 && i <= 45) units.push({ unitId: 3, tasks: ["Paint"] });

  // Unit 4 (Paint: Apr 7, i=46)
  if (i === 36 || i === 37) units.push({ unitId: 4, tasks: ["Clear Patio"] });
  if (i === 41 || i === 42) units.push({ unitId: 4, tasks: ["Power Wash"] });
  if (i >= 46 && i <= 55) units.push({ unitId: 4, tasks: ["Paint"] });

  // Unit 5 (Paint: Apr 17, i=56)
  if (i === 43 || i === 44) units.push({ unitId: 5, tasks: ["Clear Patio"] });
  if (i === 48 || i === 49) units.push({ unitId: 5, tasks: ["Power Wash"] });
  if (i >= 56 && i <= 67) units.push({ unitId: 5, tasks: ["Paint"] });

  // Unit 6 (Paint: Apr 29, i=68)
  if (i === 57 || i === 58) units.push({ unitId: 6, tasks: ["Clear Patio"] });
  if (i === 62 || i === 63) units.push({ unitId: 6, tasks: ["Power Wash"] });
  if (i >= 68 && i <= 77) units.push({ unitId: 6, tasks: ["Paint"] });

  // Unit 7 (Paint: May 11, i=80)
  if (i === 71 || i === 72) units.push({ unitId: 7, tasks: ["Clear Patio"] });
  if (i === 76 || i === 77) units.push({ unitId: 7, tasks: ["Power Wash"] });
  if (i >= 80 && i <= 91) units.push({ unitId: 7, tasks: ["Paint"] });

  // Unit 8 (Paint: May 25, i=94)
  if (i === 85 || i === 86) units.push({ unitId: 8, tasks: ["Clear Patio"] });
  if (i === 89 || i === 90) units.push({ unitId: 8, tasks: ["Power Wash"] });
  if (i >= 94 && i <= 103) units.push({ unitId: 8, tasks: ["Paint"] });

  // Unit 9 (Paint: June 4, i=104)
  if (i === 92 || i === 93) units.push({ unitId: 9, tasks: ["Clear Patio"] });
  if (i === 97 || i === 98) units.push({ unitId: 9, tasks: ["Power Wash"] });
  if (i >= 104 && i <= 111) units.push({ unitId: 9, tasks: ["Paint"] });

  // Unit 10 (Paint: June 12, i=112)
  if (i === 99 || i === 100) units.push({ unitId: 10, tasks: ["Clear Patio"] });
  if (i === 104 || i === 105) units.push({ unitId: 10, tasks: ["Power Wash"] });
  if (i >= 112 && i <= 119) units.push({ unitId: 10, tasks: ["Paint"] });



  return {
    date: eventDate.toISOString(),
    displayDate,
    weekNum: Math.floor(i / 7) + 1,
    units
  };
});

function InteractiveMap() {
  return (
    <div className="w-full aspect-square bg-white border rounded-xl overflow-hidden relative shadow-sm max-h-[700px] mx-auto">
      {/* Map Background Image */}
      <img
        src="/map-background.png"
        alt="Community Map"
        className="absolute inset-0 w-full h-full object-contain"
      />


    </div>
  );
}

// ... (InteractiveMap function remains the same)

function ProjectTimeline() {
  const today = new Date(); // Use current date for "Green" logic

  return (
    <div className="relative pl-8 border-l-[6px] border-slate-200 ml-4 md:ml-0">
      {/* Thicker green progress line */}
      <div
        className="absolute left-[-6px] top-0 bottom-0 w-[6px] bg-green-500 transition-all duration-1000 ease-in-out"
        style={{
          // Calculate height percentage based on how many weeks have passed.
          height: (() => {
            const start = new Date(TIMELINE[0].date).getTime();
            const end = new Date(TIMELINE[TIMELINE.length - 1].date).getTime();
            const now = today.getTime();
            if (now < start) return '0%';
            if (now > end) return '100%';
            const total = end - start;
            const current = now - start;
            return `${(current / total) * 100}%`;
          })()
        }}
      />

      <div className="space-y-8 py-4">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-6">
          Timeline of Events - <span className="text-red-500">Schedule Updated 2/11/26</span>
        </h3>

        {TIMELINE.map((event, index) => {
          const isPast = new Date(event.date) <= today;
          return (
            <div key={index} className="relative">
              {/* Dot on the line - centered on the 6px line */}
              {/* Line center is -3px relative to padding box.
                  Padding is 32px (pl-8).
                  Target relative to container = -3px - 32px = -35px.
                  Dot left = -35px - 6px (half w-3) = -41px. */}
              <div className={cn(
                "absolute left-[-41px] top-1.5 h-3 w-3 rounded-full border-2 bg-background z-10",
                isPast ? "border-green-500 bg-green-500" : "border-slate-300"
              )} />

              <div className="font-bold text-lg text-foreground">
                {event.displayDate}
              </div>

              {/* Units and Tasks */}
              <div className="mt-2 space-y-4">
                {event.units.length > 0 ? (
                  event.units.map((u, i) => (
                    <div key={i} className="pl-4">
                      <div className="font-semibold text-md text-muted-foreground mb-1">
                        Unit {u.unitId}
                      </div>
                      <div className="pl-4 border-l-2 border-slate-100">
                        {u.tasks.map((task, tIndex) => (
                          <div key={tIndex} className="text-md text-muted-foreground">
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="pl-4 text-md text-muted-foreground/50 italic">
                    No scheduled events
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            2026 Chelsea Parc Townhome Painting Project
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whenever new information is available, it will be posted here. Check back as often as you like. Townhome owners need to permit Paisley Paint employees to do their work without interferance.  Take up issues with myself, Jonathon @ 859-797-8351 (though I have no power) or HMI Management at 407-628-1086.</p>
          <p className="text-red-500 text-lg"><b>Notice:</b> Cars must be moved away from buildings being painted.</p>
        </div>


        {/* Interactive Map Section (White Container) */}
        <div className="max-w-4xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-sm ring-1 ring-slate-200">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center text-black/60">Community Map</h3>
            <p className="mb-6 text-center text-black/60 text-lg">
              Extensive townhome communication resulted in the below paint colors selected for each unit. Unit numbers assist with communication and do reflect painting order per contractor. <span className="text-red-500"><b>Corrections:</b></span> Doors will be painted the colors posted at the clubhouse per the ACB Board. The blue body color changed slightly to "Foggy Day" which matches the exterior color of the home at 1499 Creekside Cir. Feel free to text me with any questions.
            </p>
            <InteractiveMap />
          </div>
        </div>

        {/* Timeline Section (Below Map, No Container) */}
        <div className="max-w-2xl mx-auto mt-16">
          <ProjectTimeline />
        </div>

      </div>
    </section>
  );
}
