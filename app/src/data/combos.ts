import { eventData } from './events';

export type ComboType = 'TECH_ALL' | 'NON_TECH_ALL' | 'TECH_ST' | 'NON_TECH_ST' | 'MIXED_LIMITED';

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

export const COMBOS: Combo[] = [ // Shared combo definitions
    {
        id: 'MIXED_LIMITED',
        name: 'Tech + Non-Tech Combo',
        price: 270,
        description: 'Mix of Tech & Non-Tech',
        condition: 'Max 2 Tech & 3 Non-Tech events (Max 5 total).',
        filter: (e) => e.type === 'TECHNICAL' || e.type === 'NON TECHNICAL',
        validateAdd: (_events, newId) => {
            // Simulate adding the new event to check counts
            const nextEvents = [..._events, newId];
            const techCount = nextEvents.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            const nonTechCount = nextEvents.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;

            if (eventData[newId]?.type === 'TECHNICAL' && techCount > 2) return { valid: false, message: 'Maximum 2 Technical events allowed.' };
            if (eventData[newId]?.type === 'NON TECHNICAL' && nonTechCount > 3) return { valid: false, message: 'Maximum 3 Non-Technical events allowed.' };
            if (nextEvents.length > 5) return { valid: false, message: 'Maximum 5 events total allowed.' };

            return { valid: true };
        },
        validateNext: (events) => {
            if (events.length === 0) return { valid: false, message: 'Select at least one event.' };
            return { valid: true };
        }
    },
    {
        id: 'TECH_ST',
        name: 'Technical + Stranger Things',
        price: 350,
        description: 'Any Tech Event + Flagship',
        condition: 'Any Technical event + Stranger Things.',
        filter: (e) => e.type === 'TECHNICAL' || e.type === 'FLAGSHIP',
        validateAdd: () => ({ valid: true }), // No blocking constraints on add, just min reqs
        validateNext: (events) => {
            const hasST = events.includes('stranger-things');
            const techCount = events.filter(id => eventData[id]?.type === 'TECHNICAL').length;
            if (!hasST) return { valid: false, message: 'Stranger Things is required for this combo.' };
            if (techCount === 0) return { valid: false, message: 'Select at least one Technical event.' };
            return { valid: true };
        }
    },
    {
        id: 'NON_TECH_ST',
        name: 'Non-Tech + Stranger Things',
        price: 300,
        description: 'Any Non-Tech Event + Flagship',
        condition: 'Any Non-Technical event + Stranger Things.',
        filter: (e) => e.type === 'NON TECHNICAL' || e.type === 'FLAGSHIP',
        validateAdd: () => ({ valid: true }),
        validateNext: (events) => {
            const hasST = events.includes('stranger-things');
            const nonTechCount = events.filter(id => eventData[id]?.type === 'NON TECHNICAL').length;
            if (!hasST) return { valid: false, message: 'Stranger Things is required for this combo.' };
            if (nonTechCount === 0) return { valid: false, message: 'Select at least one Non-Technical event.' };
            return { valid: true };
        }
    },
    {
        id: 'TECH_ALL',
        name: 'Tech Events Combo',
        price: 300,
        description: 'Access to ALL Technical Events',
        condition: 'Attend any/all Technical events.',
        filter: (e) => e.type === 'TECHNICAL',
        validateAdd: (_events, newId) => {
            if (eventData[newId]?.type === 'NON TECHNICAL') return { valid: false, message: 'Only Technical events are allowed in this combo.' };
            return { valid: true };
        },
        validateNext: () => ({ valid: true })
    },
    {
        id: 'NON_TECH_ALL',
        name: 'Non-Tech Combo',
        price: 250,
        description: 'Access to ALL Non-Tech Events',
        condition: 'Attend any/all Non-Technical events.',
        filter: (e) => e.type === 'NON TECHNICAL',
        validateAdd: (_events, newId) => {
            if (eventData[newId]?.type === 'TECHNICAL') return { valid: false, message: 'Only Non-Technical events are allowed in this combo.' };
            return { valid: true };
        },
        validateNext: () => ({ valid: true })
    }
];
