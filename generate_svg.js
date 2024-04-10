const generateStats = (data) => {
    return data.error==""? (`
    <svg width="330" height="180" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <style>
            @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        </style>
        <rect x="5" y="5" width="320" height="170" class="bg-gray-900 rounded-lg" />
        <foreignObject x="10" y="17" width="318" height="176">
            <div xmlns="http://www.w3.org/1999/xhtml">
                <div class="text-green-400 text-sm font-semibold text-center">Naukri Code 360 (Code Studio- Coding Ninjas)</div>
                <div class="text-white text-lg font-bold mb-4 mt-2 text-center">Total Problems Solved - ${data.total}</div>
                <div class="flex flex-wrap gap-4 justify-center">
                    <div class="text-gray-400 text-sm uppercase">
                        Easy -
                        <span class="text-white font-semibold">${data.easy}</span>
                    </div>
                    <div class="text-gray-400 text-sm uppercase">
                        Moderate -
                        <span class="text-white font-semibold">${data.moderate}</span>
                    </div>
                    <div class="text-gray-400 text-sm uppercase">
                        Hard -
                        <span class="text-white font-semibold">${data.hard}</span>
                    </div>
                    <div class="text-gray-400 text-sm uppercase">
                        Ninja -
                        <span class="text-white font-semibold">${data.ninja}</span>
                    </div>
                </div>
            </div>
        </foreignObject>
    </svg>
`):(`
    <svg width="330" height="180" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <style>
            @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        </style>
        <rect x="5" y="5" width="320" height="170" class="bg-gray-900 rounded-lg" />
        <foreignObject x="10" y="17" width="318" height="176">
            <div xmlns="http://www.w3.org/1999/xhtml">
                <div class="text-green-400 text-sm font-semibold text-center">Naukri Code 360 (Code Studio- Coding Ninjas)</div>
                <div class="text-white text-lg font-bold mb-4 mt-2 text-center">Some Error - ${data.error}</div>            
            </div>
        </foreignObject>
    </svg>
`);

}
export default generateStats;