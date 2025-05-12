import { Button } from '@/components/ui/button';
import { PlaneTakeoff, Map, Settings2, ArrowRight } from 'lucide-react';
import { Globe } from '@/components/landing/globe';

export default function HomePage() {
  return (
    <main>
      <section className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-primary tracking-tight sm:text-5xl md:text-6xl">
                Plan Your Flight
                <span className="block text-chart-2">Faster Than Ever</span>
              </h1>
              <p className="mt-3 text-base text-primary sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              A modern aviation planning tool that lets you map routes, track altitudes,
              and visualize your mission from takeoff to touchdown.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a
                  href="https://github.com/mathewlewallen/opencloudmap"
                  target="_blank"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg rounded-full"
                  >
                    Contribute to the Mission
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <Globe />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-chart-2 text-white">
              <PlaneTakeoff className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-primary">
                Flight Route Creation
                </h2>
                <p className="mt-2 text-base text-primary">
                Define and edit custom flight plans with waypoints, altitudes, and speed profiles.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-chart-2 text-white">
                <Map className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-primary">
                Live Map Visualization
                </h2>
                <p className="mt-2 text-base text-primary">
                View your route, terrain overlays, and FIR/UIR boundaries using React + OpenLayers.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-chart-2 text-white">
                <Settings2 className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-primary">
                Custom Altitude Profiles
                </h2>
                <p className="mt-2 text-base text-primary">
                  Plan climb, cruise, and descent segments precisely, with altitude hover details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl underline underline-offset-4 decoration-chart-2">
                What is the mission?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-primary">
                We are starting with a simple flight planning tool that allows you to plan your flight route, visualize it, and share it with your team.
                Then, we are going to add an AI agent that will help you plan your flight route, and make it even easier to plan your flight.
                We will also add a chat interface that will allow you to chat with the AI agent, and get help with your flight planning.
                There are also many documents that guide flight around the world, and we will add a tool that will allow you to search for documents,
                and have AI agents available to answer questions about the documents.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
      <a
        href="https://github.com/mathewlewallen/opencloudmap"
        target="_blank"
        rel="noreferrer"
      >
        <Button
          size="lg"
          className="group relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-chart-2/50 to-chart-2/90 px-14 py-5 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <span className="bg-gradient-to-r px-4 text-black dark:text-white bg-clip-text text-lg font-extrabold">
            We can't do it alone
          </span>
          <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </a>
    </div>
          </div>
        </div>
      </section>
    </main>
  );
}
