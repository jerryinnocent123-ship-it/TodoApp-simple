// Header.jsx (korije ak bon style)
import { useState, useEffect } from "react";

function Header() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Date a goch */}
                    <div className="text-white">
                        <div className="text-sm font-medium opacity-90">
                            {currentTime.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </div>
                        <div className="text-lg font-semibold">
                            {currentTime.toLocaleTimeString()}
                        </div>
                    </div>

                    {/* Non an a dwat */}
                    <div>
                        <h1 className="text-white text-xl md:text-2xl font-bold">
                            Todo List created by Jerry INNOCENT
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;