// hooks/useNavigationInterceptor.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useNavigationInterceptor = (shouldBlock) => {
    const router = useRouter();

    useEffect(() => {
        if (!shouldBlock) return;

        const handleBeforeUnload = (e) => {
            debugger;
            e.preventDefault();
            e.returnValue = '';
        };

        const handleRouteChange = (url) => {
            const confirmLeave = window.confirm(
                'Tienes cambios sin guardar. ¿Estás seguro de que deseas salir?'
            );
            if (!confirmLeave) {
                // Cancelar navegación
                router.refresh(); // Refresca la página para cancelar la navegación
            }
        };

        // Escuchar el evento de cerrar o recargar la página
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Interceptar las funciones de navegación
        const originalPush = router.push;
        const originalReplace = router.replace;

        router.push = (url, options) => {
            handleRouteChange(url);
            return originalPush.call(router, url, options);
        };

        router.replace = (url, options) => {
            handleRouteChange(url);
            return originalReplace.call(router, url, options);
        };

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            router.push = originalPush;
            router.replace = originalReplace;
        };
    }, [shouldBlock, router]);
};
