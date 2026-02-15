import { eventData } from './events';

export type ComboType = 'PREMIUM' | 'ELITE' | 'BASIC' | 'HACKATHON';

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
        id: 'PREMIUM',
        name: 'PREMIUM PASS',
        price: 249,
        description: '2 Tech + 2 Non-Tech + Stranger Things',
        condition: '4 Events + Flagship Event',
        filter: (e) => e.type !== 'HACKATHON',
        validateAdd: (events, newId) => {
            const nextEvents = [...events, newId];
            const techCount = nextEvents.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = nextEvents.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const flagshipCount = nextEvents.filter(id => eventData[id]?.type === 'FLAGSHIP').length;

            if (eventData[newId]?.type === 'TECHNICAL' && techCount > 2) return { valid: false, message: 'Max 2 Technical events allowed.' };
            if (eventData[newId]?.type === 'NON TECHNICAL' && nonTechCount > 2) return { valid: false, message: 'Max 2 Non-Technical events allowed.' };
            if (eventData[newId]?.type === 'FLAGSHIP' && flagshipCount > 1) return { valid: false, message: 'Already selected Flagship event.' };
            if (eventData[newId]?.type === 'HACKATHON') return { valid: false, message: 'Hackathon requires a separate pass.' };

            return { valid: true };
        },
        validateNext: (events) => {
            const techCount = events.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = events.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const hasST = events.includes('stranger-things');

            if (techCount !== 2) return { valid: false, message: `Select exactly 2 Technical events.` };
            if (nonTechCount !== 2) return { valid: false, message: `Select exactly 2 Non-Technical events.` };
            if (!hasST) return { valid: false, message: 'Stranger Things is required for this pass.' };

            return { valid: true };
        }
    },
    {
        id: 'ELITE',
        name: 'ELITE PASS',
        price: 199,
        description: '1 Tech + 1 Non-Tech + Stranger Things',
        condition: '2 Events + Flagship Event',
        filter: (e) => e.type !== 'HACKATHON',
        validateAdd: (events, newId) => {
            const nextEvents = [...events, newId];
            const techCount = nextEvents.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = nextEvents.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const flagshipCount = nextEvents.filter(id => eventData[id]?.type === 'FLAGSHIP').length;

            if (eventData[newId]?.type === 'TECHNICAL' && techCount > 1) return { valid: false, message: 'Max 1 Technical event allowed.' };
            if (eventData[newId]?.type === 'NON TECHNICAL' && nonTechCount > 1) return { valid: false, message: 'Max 1 Non-Technical event allowed.' };
            if (eventData[newId]?.type === 'FLAGSHIP' && flagshipCount > 1) return { valid: false, message: 'Already selected Flagship event.' };
            if (eventData[newId]?.type === 'HACKATHON') return { valid: false, message: 'Hackathon requires a separate pass.' };

            return { valid: true };
        },
        validateNext: (events) => {
            const techCount = events.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = events.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            const hasST = events.includes('stranger-things');

            if (techCount !== 1) return { valid: false, message: `Select exactly 1 Technical event.` };
            if (nonTechCount !== 1) return { valid: false, message: `Select exactly 1 Non-Technical event.` };
            if (!hasST) return { valid: false, message: 'Stranger Things is required for this pass.' };

            return { valid: true };
        }
    },

    {
        id: 'BASIC',
        name: 'BASIC PASS',
        price: 179,
        description: 'Any 1 Event (including Stranger Things)',
        condition: 'Single Event Entry',
        filter: (e) => e.type !== 'HACKATHON',
        validateAdd: (events, newId) => {
            if (eventData[newId]?.type === 'HACKATHON') return { valid: false, message: 'Hackathon requires a separate pass.' };
            if (events.length >= 1) return { valid: false, message: 'Only 1 event allowed in Base Pass.' };
            return { valid: true };
        },
        validateNext: (events) => {
            if (events.length !== 1) return { valid: false, message: 'Select exactly 1 event.' };
            return { valid: true };
        },
    },
    {
        id: 'HACKATHON',
        name: 'HACKATHON PASS',
        price: 199,
        description: 'Entry to Hackathon Event Only',
        condition: 'Hackathon Entry',
        filter: (e) => e.type === 'HACKATHON',
        validateAdd: (events, newId) => {
            if (eventData[newId]?.type !== 'HACKATHON') return { valid: false, message: 'This pass is for Hackathon only.' };
            if (events.length >= 1) return { valid: false, message: 'Only 1 event allowed.' };
            return { valid: true };
        },
        validateNext: (events) => {
            const hasHackathon = events.some(id => eventData[id]?.type === 'HACKATHON');
            if (!hasHackathon || events.length !== 1) return { valid: false, message: 'Select the Hackathon event.' };
            return { valid: true };
        }
    }
];
