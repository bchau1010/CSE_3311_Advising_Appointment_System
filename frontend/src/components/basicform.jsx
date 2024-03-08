import React from "react";

const Basicform = () => {
    return (
        <div class="bg-white py-6 sm:py-8 lg:py-12">
            <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                
                <form class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

                    <div class="sm:col-span-2">
                        <label for="subject" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Reason for the Appointment</label>
                        <input name="subject" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div class="sm:col-span-2">
                        <label for="message" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Message</label>
                        <textarea name="message" class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                    </div>

                    <div class="flex items-center justify-between sm:col-span-2">
                        <button class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Send</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default Basicform;