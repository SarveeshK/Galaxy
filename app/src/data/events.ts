
import { Code, FileQuestion, Zap, GitBranch, Shield, Users } from 'lucide-react';

export const eventData: Record<string, {
    name: string;
    tagline: string;
    teamSize: string; // Display string
    minMembers: number;
    maxMembers: number;
    date: string;
    time: string;
    venue: string;
    rounds: { name: string; description: string }[];
    coordinators: { name: string; phone: string }[];
    color: string;
    icon: any; // Lucide icon or string char
    posterImage?: string;
    description?: string;
    type: 'TECHNICAL' | 'NON TECHNICAL' | 'FLAGSHIP';
    price: number;
}> = {
    'project-war': {
        name: 'PROJECT WAR',
        tagline: 'SHOWCASE YOUR INNOVATIVE PROJECTS AND COMPETE FOR GLORY',
        teamSize: '3-4 Members',
        minMembers: 3,
        maxMembers: 4,
        date: 'Feb 27',
        time: '10:00 AM - 3:00 PM',
        venue: 'Project Lab',
        rounds: [
            { name: 'Project Demo', description: 'Present your working prototype to the judges.' },
            { name: 'Q&A Session', description: 'Defend your project methodology and implementation.' },
        ],
        coordinators: [
            { name: 'Shek Allavudhin Batsha', phone: '8778236418' },
            { name: 'Shunmuga Lakshmi V', phone: '8825977538' },
        ],
        color: 'from-blue-400 to-blue-600',
        icon: Code,
        type: 'TECHNICAL',
        price: 300,
        posterImage: '/project-war-detail.jpg',
        description: `Project Expo is an event where students showcase their innovative projects and technical ideas. It provides a platform to demonstrate creativity, practical knowledge, and real-world applications of engineering concepts.`,
    },
    'paper-presentation': {
        name: 'PAPER PRESENTATION',
        tagline: 'PRESENT YOUR RESEARCH AND IDEAS TO A PANEL OF EXPERTS',
        teamSize: '2-3 Members',
        minMembers: 2,
        maxMembers: 3,
        date: 'Feb 27',
        time: '10:00 AM - 3:00 PM',
        venue: 'Seminar Hall',
        rounds: [
            { name: 'Presentation', description: 'Present your technical paper with visual aids.' },
        ],
        coordinators: [
            { name: 'Michael raj A', phone: '7010617647' },
            { name: 'Jayashree D', phone: '9566272714' },
        ],
        color: 'from-purple-400 to-purple-600',
        icon: FileQuestion,
        type: 'TECHNICAL',
        price: 300,
        posterImage: '/paper-presentation-poster.jpg',
        description: `Paper Presentation is a technical event where participants present innovative ideas, research findings, or emerging technologies. It evaluates analytical thinking, communication skills, and the ability to explain technical concepts clearly and confidently.`,
    },
    'ai-prompt-battle': {
        name: 'AI PROMPT BATTLE',
        tagline: 'MASTER THE ART OF PROMPTING IN THIS AI SHOWDOWN',
        teamSize: 'Max 2 Members',
        minMembers: 1,
        maxMembers: 2,
        date: 'Feb 27',
        time: '1:30 PM - 4:00 PM',
        venue: 'Computer Center',
        rounds: [
            { name: 'Prompt Engineering', description: 'Generate the best outputs using AI tools.' },
        ],
        coordinators: [
            { name: 'Sanjay K', phone: '9042469959' },
            { name: 'Abitha A', phone: '9123551977' },
        ],
        color: 'from-amber-400 to-yellow-500',
        icon: Zap,
        type: 'NON TECHNICAL',
        price: 250,
        posterImage: '/ai-prompt-battle.jpg',
        description: `This is a fun, non-technical game where participants compete by crafting clear, creative, and powerful prompts to get the best results from AI. With a given theme and exciting rounds, players test their imagination, communication, and prompt skills to stand out and win.`,
    },
    'arduino-hackathon': {
        name: 'ARDUINO HACKATHON',
        tagline: 'CODE . CREATE . INNOVATE',
        teamSize: '1-4 Members',
        minMembers: 1,
        maxMembers: 4,
        date: 'Feb 27',
        time: '10:00 AM - 3:00 PM',
        venue: 'Embedded Systems Lab',
        rounds: [
            { name: 'Circuit Building', description: 'Design and assemble the required circuit.' },
            { name: 'Coding & Execution', description: 'Program the Arduino to achieve the task.' },
        ],
        coordinators: [
            { name: 'Mohammed Thoufiq A', phone: '8838651916' },
            { name: 'Arunthathi M', phone: '9025478135' },
        ],
        color: 'from-green-400 to-emerald-600',
        icon: GitBranch,
        type: 'TECHNICAL',
        price: 300,
        posterImage: '/arduino-hackathon-detail.jpg',
        description: `Develop intelligent Arduino solutions through hands-on prototyping.
Showcase creativity through real working models.`,
    },
    'circuit-debugging': {
        name: 'CIRCUIT DEBUGGING',
        tagline: 'FIND FAULTS AND FIX CIRCUITS TO PROVE YOUR HARDWARE SKILLS',
        teamSize: 'Max 2 Members',
        minMembers: 1,
        maxMembers: 2,
        date: 'Feb 27',
        time: '10:00 AM - 1:00 PM',
        venue: 'Electronics Lab',
        rounds: [
            { name: 'Fault Finding', description: 'Identify errors in the given circuit diagram.' },
            { name: 'Practical Debugging', description: 'Fix the hardware circuit to make it work.' },
        ],
        coordinators: [
            { name: 'Gnaneshkanthan S', phone: '9361696966' },
            { name: 'Jayashree S', phone: '8667373245' },
        ],
        color: 'from-red-400 to-rose-600',
        icon: Shield,
        type: 'TECHNICAL',
        price: 300,
        posterImage: '/circuit-debugging-poster.jpg',
        description: `Circuit Debugging is a technical event that tests participants’ understanding of basic electronic circuits and problem-solving skills. Participants analyze circuit diagrams with intentional errors and identify and correct the faults using logical reasoning, without using simulation tools or hardware. The event focuses on core circuit concepts, attention to detail, and efficient debugging within limited time.`,
    },
    'chase-and-build': {
        name: 'CHASE AND BUILD',
        tagline: 'A THRILLING EVENT TO TEST YOUR SPEED AND BUILDING SKILLS',
        teamSize: '2-3 Members',
        minMembers: 2,
        maxMembers: 3,
        date: 'Feb 27',
        time: '1:30 PM - 4:00 PM',
        venue: 'Main Ground',
        rounds: [
            { name: 'Speed Chase', description: 'Race against time to collect components.' },
            { name: 'Build Phase', description: 'Construct the structure before opponents.' },
        ],
        coordinators: [
            { name: 'Coordinator 1', phone: '9876543210' },
            { name: 'Coordinator 2', phone: '9876543211' },
        ],
        color: 'from-teal-400 to-green-500',
        icon: Zap,
        type: 'TECHNICAL',
        price: 300,
        posterImage: '/chase-and-build-poster.jpg',
        description: `Chase & Build is a technical treasure hunt where teams solve clues, collect components, and build a working circuit, testing problem-solving, teamwork, and hands-on electronics skills.`,
    },
    'ipl-auction': {
        name: 'IPL AUCTION',
        tagline: 'STRATEGIZE AND BUILD YOUR DREAM TEAM IN THIS AUCTION SIMULATION',
        teamSize: 'Max 4 Members',
        minMembers: 1,
        maxMembers: 4,
        date: 'Feb 27',
        time: '10:00 AM - 3:00 PM',
        venue: 'Auditorium',
        rounds: [
            { name: 'Budget Allocation', description: 'Manage your virtual budget to buy players.' },
            { name: 'Team Building', description: 'Assemble the best possible team within constraints.' },
        ],
        coordinators: [
            { name: 'Tharun Kumar P', phone: '9363037379' },
            { name: 'Thahifa Fathima A', phone: '9500974615' },
        ],
        color: 'from-indigo-400 to-blue-500',
        icon: Users,
        type: 'NON TECHNICAL',
        price: 250,
        posterImage: '/ipl-auction-poster.jpg',
        description: `Experience the thrill of a live IPL-style auction where teams compete in real-time bidding.

Test your cricket knowledge, strategy, and decision-making skills under pressure.

Build a strong team, outbid your rivals, and prove your auction mastery.`,
    },
    'hintdrop': {
        name: 'HINTDROP',
        tagline: 'FOLLOW THE CLUES AND SOLVE THE MYSTERY',
        teamSize: '3-4 Members',
        minMembers: 3,
        maxMembers: 4,
        date: 'Feb 27',
        time: '10:00 AM - 1:00 PM',
        venue: 'Campus Grounds',
        rounds: [
            { name: 'Clue Hunting', description: 'Find hidden clues across the location.' },
            { name: 'Puzzle Solving', description: 'Decode the clues to reach the final destination.' },
        ],
        coordinators: [
            { name: 'Sowresh R', phone: '7845321588' },
            { name: 'Bafina A', phone: '9585805225' },
        ],
        color: 'from-pink-400 to-rose-500',
        icon: Zap,
        type: 'NON TECHNICAL',
        price: 250,
        posterImage: '/hintdrop-poster.jpg',
        description: `Hint Drop is not about what you know, but how smartly you say it. Easy to play, hard to master, where every clue counts and only the sharpest teams rise to the top.

Simple to Play! Thrilling to Win!`,
    },
    'short-film': {
        name: 'SHORT FILM',
        tagline: 'EXPRESS YOUR CREATIVITY THROUGH THE LENS',
        teamSize: 'Max 3 Members',
        minMembers: 1,
        maxMembers: 3,
        date: 'Feb 27',
        time: '1:30 PM - 4:00 PM',
        venue: 'Main Auditorium',
        rounds: [
            { name: 'Screening', description: 'Showcase your short film to the audience and judges.' },
            { name: 'Critique', description: 'Receive feedback and scores based on storytelling and technicality.' },
        ],
        coordinators: [
            { name: 'Sudharshan A', phone: '7695827386' },
            { name: 'Dharani S', phone: '7826949987' },
        ],
        color: 'from-amber-400 to-orange-500',
        icon: Users,
        type: 'NON TECHNICAL',
        price: 250,
        posterImage: '/short-film-poster.jpg',
        description: `Short Film Showcase

▫️Unleash your creativity in a quick-fire film challenge. Easy to enter, tough to stand out—where storytelling shines and the best ideas captivate all.

Simple to Submit`,
    },
    'spin-and-win': {
        name: 'SPIN AND WIN',
        tagline: 'WHERE LUCK MEETS STRATEGY',
        teamSize: 'Max 3 Members',
        minMembers: 1,
        maxMembers: 3,
        date: 'Feb 27',
        time: 'All Day',
        venue: 'Stalls Area',
        rounds: [
            { name: 'Spin the Wheel', description: 'Spin the wheel and test your fortune.' },
        ],
        coordinators: [
            { name: 'Kaviselvam E', phone: '9585381455' },
            { name: 'Catherin Jersha J S', phone: '7305620340' },
        ],
        color: 'from-cyan-400 to-blue-500',
        icon: Zap,
        type: 'NON TECHNICAL',
        price: 250,
        posterImage: '/spin-and-win-detail.jpg',
        description: `Spin and Win is all about luck meeting skill! Teams face the thrill of the spinner, where every turn decides their challenge. Easy to, Medium, or Hard—no one knows what’s coming next. Quick thinking, teamwork, and speed are the keys.

Simple to Play! Exciting to Conquer!`,
    },
    'stranger-things': {
        name: 'STRANGER THINGS',
        tagline: 'OBSERVE. SOLVE. ESCAPE.',
        teamSize: '4 Members',
        minMembers: 4,
        maxMembers: 4,
        date: 'Feb 27',
        time: 'All Day',
        venue: 'Stalls Area',
        rounds: [
            { name: 'Escape', description: 'Escape the upside down before time runs out.' }
        ],
        coordinators: [
            { name: 'Coordinator', phone: '0000000000' }
        ],
        color: 'from-red-500 to-black',
        icon: Shield,
        type: 'FLAGSHIP',
        price: 200,
        posterImage: '/stranger-things-poster.jpg',
        description: `Enter the world of Stranger Things, where clues are hidden and nothing is as it seems. Test your observation, logic and teamwork through fun challenges inspired by the Upside Down.

Think smart, act fast and trust your team to escape in time.`,
    },
};
