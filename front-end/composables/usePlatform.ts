export function usePlatform() {
    // Détection du type de périphérique
    function getDeviceType(ua: string): string {
        if (/Mobi|Android/i.test(ua)) return 'Mobile';
        if (/Tablet|iPad/i.test(ua)) return 'Tablet';
        return 'Desktop';
    }

    // Détection du système d’exploitation
    function getOS(ua: string): string {
        if (/Windows NT 10/.test(ua)) return 'Windows 10';
        if (/Windows NT 6.3/.test(ua)) return 'Windows 8.1';
        if (/Windows NT 6.1/.test(ua)) return 'Windows 7';
        if (/Mac OS X/.test(ua)) return 'macOS';
        if (/Android/.test(ua)) return 'Android';
        if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
        if (/Linux/.test(ua)) return 'Linux';
        return 'Inconnu';
    }

    // Détection du navigateur
    function getBrowser(ua: string): string {
        if (/Chrome\/\d+/.test(ua) && !/Edge|Edg/.test(ua)) return 'Chrome';
        if (/Firefox\/\d+/.test(ua)) return 'Firefox';
        if (/Safari\/\d+/.test(ua) && !/Chrome/.test(ua)) return 'Safari';
        if (/Edg\/\d+/.test(ua)) return 'Edge';
        if (/OPR\/\d+/.test(ua)) return 'Opera';
        return 'Inconnu';
    }

    // Détection de l'adresse IP
    async function getIP(): Promise<string> {
        const res = await fetch('https://api.ipify.org?format=json')
        const data = await res.json()
        return data.ip as string
    }

    return {
        getDeviceType,
        getOS,
        getBrowser,
        getIP,
    }
}