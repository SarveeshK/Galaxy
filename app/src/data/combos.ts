import { eventData } from './events';

export type ComboType = 'ULTIMATE' | 'ELITE' | 'PREMIUM' | 'STANDARD' | 'BASIC';

export interface Combo {
    id: ComboType;
    name: string;
    price: number;
    description: string;
    condition: string;
    // Function to filter events for this combo
    filter: (event: typeof eventData[string]) => boolean;
    // Validation function
    validateAdd: (selectedEvents: string[], newEventId: string) => { valid: boolean; message?: string }; // Check before adding
    validateNext: (selectedEvents: string[]) => { valid: boolean; message?: string }; // Check before proceeding
}

export const COMBOS: Combo[] = [
    {
        id: 'ULTIMATE',
        name: 'The Ultimate Pass',
        price: 299,
        description: '3 Tech + 2 Non-Tech + Stranger Things',
        condition: 'Flagship Event + 5 Events',
        filter: (_) => true, // Can see all events, validation restricts selection
        validateAdd: (events, newId) => {
            const nextEvents = [...events, newId];
            const techCount = nextEvents.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = nextEvents.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const flagshipCount = nextEvents.filter(id => eventData[id]?.type === 'FLAGSHIP').length;

            if (eventData[newId]?.type === 'TECHNICAL' && techCount > 3) return { valid: false, message: 'Max 3 Technical events allowed.' };
            if (eventData[newId]?.type === 'NON TECHNICAL' && nonTechCount > 2) return { valid: false, message: 'Max 2 Non-Technical events allowed.' };
            if (eventData[newId]?.type === 'FLAGSHIP' && flagshipCount > 1) return { valid: false, message: 'Already selected Flagship event.' };

            return { valid: true };
        },
        validateNext: (events) => {
            const techCount = events.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = events.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const hasST = events.includes('stranger-things');

            if (techCount !== 3) return { valid: false, message: `Select exactly 3 Technical events (Selected: ${techCount}).` };
            if (nonTechCount !== 2) return { valid: false, message: `Select exactly 2 Non-Technical events (Selected: ${nonTechCount}).` };
            if (!hasST) return { valid: false, message: 'Stranger Things is required for this pass.' };

            return { valid: true };
        }
    },
    {
        id: 'ELITE',
        name: 'Elite Pass',
        price: 299,
        description: '2 Tech + 3 Non-Tech + Stranger Things',
        condition: 'Flagship Event + 5 Events',
        filter: (_) => true,
        validateAdd: (events, newId) => {
            const nextEvents = [...events, newId];
            const techCount = nextEvents.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = nextEvents.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const flagshipCount = nextEvents.filter(id => eventData[id]?.type === 'FLAGSHIP').length;

            if (eventData[newId]?.type === 'TECHNICAL' && techCount > 2) return { valid: false, message: 'Max 2 Technical events allowed.' };
            if (eventData[newId]?.type === 'NON TECHNICAL' && nonTechCount > 3) return { valid: false, message: 'Max 3 Non-Technical events allowed.' };
            if (eventData[newId]?.type === 'FLAGSHIP' && flagshipCount > 1) return { valid: false, message: 'Already selected Flagship event.' };

            return { valid: true };
        },
        validateNext: (events) => {
            const techCount = events.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = events.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const hasST = events.includes('stranger-things');

            if (techCount !== 2) return { valid: false, message: `Select exactly 2 Technical events (Selected: ${techCount}).` };
            if (nonTechCount !== 3) return { valid: false, message: `Select exactly 3 Non-Technical events (Selected: ${nonTechCount}).` };
            if (!hasST) return { valid: false, message: 'Stranger Things is required for this pass.' };

            return { valid: true };
        }
    },
    {
        id: 'PREMIUM',
        name: 'Premium Pass',
        price: 279,
        description: '2 Tech + 1 Non-Tech + Stranger Things',
        condition: 'Flagship Event + 3 Events',
        filter: (_) => true,
        validateAdd: (events, newId) => {
            const nextEvents = [...events, newId];
            const techCount = nextEvents.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = nextEvents.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const flagshipCount = nextEvents.filter(id => eventData[id]?.type === 'FLAGSHIP').length;

            if (eventData[newId]?.type === 'TECHNICAL' && techCount > 2) return { valid: false, message: 'Max 2 Technical events allowed.' };
            if (eventData[newId]?.type === 'NON TECHNICAL' && nonTechCount > 1) return { valid: false, message: 'Max 1 Non-Technical event allowed.' };
            if (eventData[newId]?.type === 'FLAGSHIP' && flagshipCount > 1) return { valid: false, message: 'Already selected Flagship event.' };

            return { valid: true };
        },
        validateNext: (events) => {
            const techCount = events.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = events.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const hasST = events.includes('stranger-things');

            if (techCount !== 2) return { valid: false, message: `Select exactly 2 Technical events (Selected: ${techCount}).` };
            if (nonTechCount !== 1) return { valid: false, message: `Select exactly 1 Non-Technical event (Selected: ${nonTechCount}).` };
            if (!hasST) return { valid: false, message: 'Stranger Things is required for this pass.' };

            return { valid: true };
        }
    },
    {
        id: 'STANDARD',
        name: 'Standard Pass',
        price: 249,
        description: '1 Tech + 1 Non-Tech + Stranger Things',
        condition: 'Flagship Event + 2 Events',
        filter: (_) => true,
        validateAdd: (events, newId) => {
            const nextEvents = [...events, newId];
            const techCount = nextEvents.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = nextEvents.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const flagshipCount = nextEvents.filter(id => eventData[id]?.type === 'FLAGSHIP').length;

            if (eventData[newId]?.type === 'TECHNICAL' && techCount > 1) return { valid: false, message: 'Max 1 Technical event allowed.' };
            if (eventData[newId]?.type === 'NON TECHNICAL' && nonTechCount > 1) return { valid: false, message: 'Max 1 Non-Technical event allowed.' };
            if (eventData[newId]?.type === 'FLAGSHIP' && flagshipCount > 1) return { valid: false, message: 'Already selected Flagship event.' };

            return { valid: true };
        },
        validateNext: (events) => {
            const techCount = events.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = events.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const hasST = events.includes('stranger-things');

            if (techCount !== 1) return { valid: false, message: `Select exactly 1 Technical event (Selected: ${techCount}).` };
            if (nonTechCount !== 1) return { valid: false, message: `Select exactly 1 Non-Technical event (Selected: ${nonTechCount}).` };
            if (!hasST) return { valid: false, message: 'Stranger Things is required for this pass.' };

            return { valid: true };
        }
    },
    {
        id: 'BASIC',
        name: 'Basic Pass',
        price: 249,
        description: 'The Normal Plan: 2 Tech + 2 Non-Tech',
        condition: 'Standard Events Only',
        filter: (e) => e.type !== 'FLAGSHIP', // Stranger Things hidden/disabled
        validateAdd: (events, newId) => {
            const nextEvents = [...events, newId];
            const techCount = nextEvents.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = nextEvents.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;

            if (eventData[newId]?.type === 'FLAGSHIP') return { valid: false, message: 'This pass does not include Stranger Things.' };
            if (eventData[newId]?.type === 'TECHNICAL' && techCount > 2) return { valid: false, message: 'Max 2 Technical events allowed.' };
            if (eventData[newId]?.type === 'NON TECHNICAL' && nonTechCount > 2) return { valid: false, message: 'Max 2 Non-Technical events allowed.' };

            return { valid: true };
        },
        validateNext: (events) => {
            const techCount = events.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = events.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;

            if (techCount !== 2) return { valid: false, message: `Select exactly 2 Technical events (Selected: ${techCount}).` };
            if (nonTechCount !== 2) return { valid: false, message: `Select exactly 2 Non-Technical events (Selected: ${nonTechCount}).` };

            return { valid: true };
        }
    }
];

