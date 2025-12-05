module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/create-preference/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(request) {
    try {
        const body = await request.json();
        const { nombre, email, phone, plan, adress, esRegalo } = body;
        console.log("[v0] Datos recibidos:", {
            nombre,
            email,
            phone,
            plan,
            adress,
            esRegalo
        });
        // Precios según el plan
        const prices = {
            clasica: 250,
            premium: 12500,
            elite: 22500
        };
        const planNames = {
            clasica: "Membresía Clásica",
            premium: "Membresía Premium",
            elite: "Membresía Elite"
        };
        const price = prices[plan] || 250;
        const planName = planNames[plan] || "Membresía Clásica";
        console.log("[v0] Plan seleccionado:", planName, "- Precio:", price);
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.BASE_URL;
        // Crear la preferencia de pago en Mercado Pago
        const preference = {
            items: [
                {
                    title: planName,
                    quantity: 1,
                    unit_price: price,
                    currency_id: "ARS"
                }
            ],
            payer: {
                name: nombre,
                email: email,
                phone: {
                    number: phone
                }
            },
            back_urls: {
                success: `${baseUrl}${process.env.SUCCESS_PATH || "/pago/exito"}`,
                failure: `${baseUrl}${process.env.FAILURE_PATH || "/pago/fallo"}`,
                pending: `${baseUrl}${process.env.PENDING_PATH || "/pago/pendiente"}`
            },
            auto_return: "approved",
            external_reference: JSON.stringify({
                Nombre: nombre,
                Email: email,
                Phone: phone,
                Plan: plan,
                Adress: adress,
                EsRegalo: esRegalo
            }),
            notification_url: `${baseUrl}/api/webhooks/mercadopago`
        };
        console.log("[v0] Enviando preferencia a Mercado Pago...");
        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
            },
            body: JSON.stringify(preference)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error en Mercado Pago: " + JSON.stringify(data));
        }
        console.log("[v0] Preferencia creada exitosamente:", data.id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: data.id,
            init_point: data.init_point
        });
    } catch (error) {
        console.error("[v0] Error crear preferencia:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f863a155._.js.map