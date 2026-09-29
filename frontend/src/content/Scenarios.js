export const Scenarios = {
    intro_exhibition: (state) => ({
        id: 'intro_exhibition',
        title: 'Morning Setup',
        bg: 'linear-gradient(135deg, #2d2722 0%, #3a322a 100%)', // Gallery warm dark
        speaker: 'Narrator',
        timeLimitSeconds: 30,
        text: `It's the morning of "Kaamil" — Alfaaz's exhibition at Mahatta Art Gallery. You arrive to help set up.\n\nThe exhibition opens in 43 minutes, but one artist's paintings haven't arrived. She's not answering her phone. The curator looks stressed and is currently attempting to fix the main lighting rig.`,
        actions: [
            {
                actionId: 'help_curator',
                actionText: 'Quietly take over other setup tasks to free up the curator',
                timeCost: 15,
                tags: [
                    { tag: 'initiative', direction: 'positive', strength: 1, context: 'Takes over setup tasks' },
                    { tag: 'task_completion', direction: 'positive', strength: 1, context: 'Helps curator' },
                    { tag: 'mission_alignment', direction: 'positive', strength: 1.5, context: 'Prioritizes the exhibition\'s success' }
                ],
                onExecute: (s) => s.setFlag('helped_curator_early'),
                immediateConsequenceText: "You start arranging the catalogue stand. The curator gives you a grateful nod from the ladder.",
                nextScene: 'missing_art_escalation'
            },
            {
                actionId: 'rearrange_art',
                actionText: 'Suggest rearranging the existing works to fill the gap',
                timeCost: 5,
                tags: [
                    { tag: 'adaptation', direction: 'positive', strength: 1, context: 'Proposes layout change' },
                    { tag: 'assumption_without_verification', direction: 'negative', strength: 0.5, context: 'Alters layout without artist/curator consent' }
                ],
                onExecute: (s) => {
                    s.setFlag('suggested_layout_change');
                    s.venueState.layoutIssue = false;
                },
                nextScene: 'missing_art_escalation'
            },
            {
                actionId: 'check_curator',
                actionText: 'Ask the curator what they need you to prioritize',
                timeCost: 2,
                tags: [
                    { tag: 'information_seeking', direction: 'positive', strength: 1, context: 'Asks curator for direction' },
                    { tag: 'waiting_for_instruction', direction: 'neutral', strength: 1, context: 'Requires explicit instruction' }
                ],
                onExecute: (s) => s.addInformation('curator_priority'),
                immediateConsequenceText: "\"Please just keep trying to reach the missing artist!\" they shout down.",
                nextScene: 'missing_art_escalation'
            },
            {
                actionId: 'call_artist',
                actionText: 'Keep calling the missing artist yourself',
                timeCost: 10,
                tags: [
                    { tag: 'follow_through', direction: 'positive', strength: 1, context: 'Persists in contacting artist' },
                    { tag: 'intrinsic_drive', direction: 'positive', strength: 1, context: 'Takes ownership of the missing artist problem' }
                ],
                onExecute: (s) => s.setFlag('called_artist_persistently'),
                nextScene: 'missing_art_escalation'
            }
        ]
    }),

    missing_art_escalation: (state) => {
        let text = `Thirty minutes to opening. `;
        if (state.hasFlag('called_artist_persistently')) {
            text += `The artist finally texts back: "Stuck in traffic with the canvases! 15 mins away!" `;
            state.addInformation('artist_arriving_late');
        } else {
            text += `Still no word from the missing artist. `;
        }
        
        text += `Suddenly, an early visitor arrives — a school teacher with 15 students unannounced. They heard about the exhibition on Instagram.`;

        const actions = [];
        
        actions.push({
            actionId: 'welcome_students',
            actionText: 'Welcome them and offer a mini-preview of ready works',
            timeCost: 10,
            tags: [
                { tag: 'adaptation', direction: 'positive', strength: 1, context: 'Handles unannounced group' },
                { tag: 'mission_alignment', direction: 'positive', strength: 1, context: 'Embraces community education' }
            ],
            onExecute: (s) => s.setFlag('hosted_students'),
            nextScene: 'artist_conflict'
        });

        actions.push({
            actionId: 'reject_students',
            actionText: 'Politely ask them to return when doors officially open',
            timeCost: 2,
            tags: [{ tag: 'constraint_handling', direction: 'positive', strength: 1, context: 'Enforces opening time' }],
            nextScene: 'artist_conflict'
        });

        if (!state.knows('curator_priority')) {
            actions.push({
                actionId: 'ask_curator_students',
                actionText: 'Check with the curator before letting them in',
                timeCost: 3,
                tags: [{ tag: 'escalation', direction: 'positive', strength: 1, context: 'Escalates unannounced visitor decision' }],
                nextScene: 'artist_conflict'
            });
        }

        return {
            id: 'missing_art_escalation',
            title: 'Unexpected Arrivals',
            bg: 'linear-gradient(135deg, #3a322a 0%, #463d33 100%)',
            speaker: 'Gallery Entrance',
            timeLimitSeconds: 25,
            text: text,
            actions: actions
        };
    },

    artist_conflict: (state) => {
        let text = `The doors are open. However, Faizan, an artist, is upset. His pieces are near the busy entrance. He feels his work needs a quieter corner. Another artist, Meher, is in the quiet spot and seems happy.`;
        
        if (state.hasFlag('suggested_layout_change')) {
            text += `\n\n(This tension may have been exacerbated by the earlier layout changes you suggested.)`;
        }

        return {
            id: 'artist_conflict',
            title: 'The Unhappy Artist',
            bg: 'linear-gradient(135deg, #463d33 0%, #52473c 100%)',
            speaker: 'Exhibition Floor',
            timeLimitSeconds: 30,
            text: text,
            actions: [
                {
                    actionId: 'listen_and_mediate',
                    actionText: 'Listen to Faizan, then speak to Meher separately to understand both sides',
                    timeCost: 15,
                    tags: [{ tag: 'conflict_navigation', direction: 'positive', strength: 1.5, context: 'Mediates artist dispute carefully' }],
                    onExecute: (s) => s.setFlag('mediated_conflict'),
                    nextScene: 'philosophy_club'
                },
                {
                    actionId: 'enforce_curator_decision',
                    actionText: 'Explain that placement was finalized by the curator and he should trust the process',
                    timeCost: 5,
                    tags: [{ tag: 'commitment_honoring', direction: 'positive', strength: 1, context: 'Enforces curator layout' }, { tag: 'avoidance', direction: 'negative', strength: 0.5, context: 'Avoids engaging with artist emotional need' }],
                    nextScene: 'philosophy_club'
                },
                {
                    actionId: 'propose_compromise',
                    actionText: 'Propose an immediate compromise: swap his most contemplative piece only',
                    timeCost: 8,
                    tags: [{ tag: 'creative', direction: 'positive', strength: 1, context: 'Suggests hybrid layout' }],
                    nextScene: 'philosophy_club'
                },
                {
                    actionId: 'do_nothing',
                    actionText: 'Let them work it out themselves; it\'s not your place',
                    timeCost: 0,
                    tags: [{ tag: 'avoidance', direction: 'positive', strength: 1, context: 'Avoids intervening in artist conflict' }, { tag: 'intrinsic_drive', direction: 'negative', strength: 1, context: 'Lacks drive to resolve exhibition issues' }],
                    nextScene: 'philosophy_club'
                }
            ]
        };
    },

    philosophy_club: (state) => ({
        id: 'philosophy_club',
        title: 'The Silent Voice',
        bg: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)', // Cooler tone for club
        speaker: 'Philosophy Club',
        timeLimitSeconds: 20,
        text: `Later that week at the Philosophy Club. The topic: "Does art belong to the artist or the audience?"\n\nTwo members are passionately debating. Zara, a new member, keeps leaning forward to speak but pulls back, fidgeting with her notebook.`,
        actions: [
            {
                actionId: 'invite_zara',
                actionText: 'During a pause, gently say: "Zara, I noticed you might have a thought..."',
                timeCost: 2,
                tags: [{ tag: 'perspective_consideration', direction: 'positive', strength: 1.5, context: 'Invites quiet member to speak' }],
                nextScene: 'poetry_reading'
            },
            {
                actionId: 'talk_after',
                actionText: 'Wait and approach Zara privately after the session',
                timeCost: 1,
                tags: [{ tag: 'perspective_consideration', direction: 'positive', strength: 1, context: 'Private check-in with member' }],
                nextScene: 'poetry_reading'
            },
            {
                actionId: 'suggest_round_robin',
                actionText: 'Suggest the group switch to a round-robin format',
                timeCost: 3,
                tags: [{ tag: 'coordination', direction: 'positive', strength: 1, context: 'Restructures group dialogue' }],
                nextScene: 'poetry_reading'
            },
            {
                actionId: 'let_it_be',
                actionText: 'Let it be — she will speak when she is comfortable',
                timeCost: 0,
                tags: [{ tag: 'assumption_without_verification', direction: 'neutral', strength: 1, context: 'Assumes member prefers silence' }],
                nextScene: 'poetry_reading'
            }
        ]
    }),

    poetry_reading: (state) => ({
        id: 'poetry_reading',
        title: 'The Provocative Poem',
        bg: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
        speaker: 'Literature Evening',
        timeLimitSeconds: 25,
        text: `At a literature club evening, a poet reads a sensitive piece about partition and identity. \n\nAn audience member stands up and interrupts: "This isn't appropriate for a public event — there are young people here." \n\nThe poet looks shaken. The room goes quiet.`,
        actions: [
            {
                actionId: 'defend_space',
                actionText: 'Acknowledge the concern but firmly state Alfaaz is a space for all voices',
                timeCost: 4,
                tags: [
                    { tag: 'conflict_navigation', direction: 'positive', strength: 1, context: 'Defends open dialogue' },
                    { tag: 'mission_alignment', direction: 'positive', strength: 2, context: 'Stands up for Alfaaz core values' }
                ],
                nextScene: 'childrens_workshop'
            },
            {
                actionId: 'support_poet',
                actionText: 'Step in to directly support the poet, thanking them for their courage',
                timeCost: 3,
                tags: [{ tag: 'perspective_consideration', direction: 'positive', strength: 1.5, context: 'Prioritizes artist emotional safety' }],
                nextScene: 'childrens_workshop'
            },
            {
                actionId: 'facilitate_dialogue',
                actionText: 'Propose a pause, then open it up as a facilitated conversation',
                timeCost: 15,
                tags: [{ tag: 'coordination', direction: 'positive', strength: 1.5, context: 'Turns tension into facilitated dialogue' }],
                nextScene: 'childrens_workshop'
            },
            {
                actionId: 'check_poet_quietly',
                actionText: 'Quietly check on the poet while someone else handles the audience',
                timeCost: 5,
                tags: [{ tag: 'delegation', direction: 'neutral', strength: 1, context: 'Leaves audience management to others' }],
                nextScene: 'childrens_workshop'
            }
        ]
    }),

    childrens_workshop: (state) => ({
        id: 'childrens_workshop',
        title: 'The Outreach',
        bg: 'linear-gradient(135deg, #744210 0%, #975a16 100%)', // Warm earthy tone
        speaker: 'Art Therapy Center',
        timeLimitSeconds: 20,
        text: `Alfaaz is running an art therapy workshop at a children's care center.\n\nMost children are engaged, but an 8-year-old boy is sitting apart, staring at a blank sheet. \n\nYour co-volunteer whispers, "Just leave him, he never participates."`,
        actions: [
            {
                actionId: 'doodle_quietly',
                actionText: 'Sit near him quietly and start doodling on your own paper without asking him anything',
                timeCost: 10,
                tags: [{ tag: 'perspective_consideration', direction: 'positive', strength: 2, context: 'Non-verbal invitation to withdrawn child' }],
                nextScene: 'commitment_test'
            },
            {
                actionId: 'bring_materials',
                actionText: 'Bring him different materials (clay, stickers) in case painting isn\'t his medium',
                timeCost: 4,
                tags: [{ tag: 'initiative', direction: 'positive', strength: 1, context: 'Offers alternative mediums' }],
                nextScene: 'commitment_test'
            },
            {
                actionId: 'ask_to_draw',
                actionText: 'Gently ask him what he would like to draw',
                timeCost: 3,
                tags: [{ tag: 'information_seeking', direction: 'neutral', strength: 1, context: 'Directly asks withdrawn child' }],
                nextScene: 'commitment_test'
            },
            {
                actionId: 'respect_space',
                actionText: 'Respect his space and follow the co-volunteer\'s advice',
                timeCost: 0,
                tags: [{ tag: 'avoidance', direction: 'neutral', strength: 1, context: 'Follows peer advice to leave child alone' }],
                nextScene: 'commitment_test'
            }
        ]
    }),

    commitment_test: (state) => ({
        id: 'commitment_test',
        title: 'The Weekend',
        bg: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)', // Night time
        speaker: 'Friday Night',
        timeLimitSeconds: 30,
        text: `You've been volunteering for three weeks. This Saturday, you committed to setting up a community photography walk.\n\nOn Friday night, a close friend calls — they are visiting town for one day only (Saturday) and want to spend it with you. You've also been feeling a bit burnt out.`,
        actions: [
            {
                actionId: 'compromise_time',
                actionText: 'Show up for the setup, let the team know you need to leave early, then see your friend',
                timeCost: 0,
                tags: [{ tag: 'constraint_handling', direction: 'positive', strength: 1, context: 'Compromises schedule to balance commitments' }],
                nextScene: 'end'
            },
            {
                actionId: 'find_cover',
                actionText: 'Call the team lead, explain honestly, ask for cover, and offer to take on extra next week',
                timeCost: 0,
                tags: [{ tag: 'communication', direction: 'positive', strength: 1.5, context: 'Proactively communicates unavailability' }],
                nextScene: 'end'
            },
            {
                actionId: 'skip_alfaaz',
                actionText: 'Go see your friend — you need the break and the team will understand',
                timeCost: 0,
                tags: [
                    { tag: 'commitment_honoring', direction: 'negative', strength: 1.5, context: 'Skips volunteer commitment without cover' },
                    { tag: 'intrinsic_drive', direction: 'negative', strength: 1, context: 'Drops responsibility when tired' }
                ],
                nextScene: 'end'
            },
            {
                actionId: 'skip_friend',
                actionText: 'Show up for the full setup and skip meeting your friend. A commitment is a commitment.',
                timeCost: 0,
                tags: [
                    { tag: 'commitment_honoring', direction: 'positive', strength: 1.5, context: 'Prioritizes volunteer duty over personal event' },
                    { tag: 'intrinsic_drive', direction: 'positive', strength: 1.5, context: 'Shows high motivation despite burnout' }
                ],
                nextScene: 'end'
            }
        ]
    })
};

export class ContentRouter {
    getScene(sceneId, state) {
        if (!Scenarios[sceneId]) return null;
        return Scenarios[sceneId](state);
    }

    applyConsequences(state) {
        // Evaluate delayed consequences based on flags
    }

    async showConsequence(text) {
        // UI hook to show brief floating text or modal
        const el = document.getElementById('consequence-overlay');
        if (el) {
            el.textContent = text;
            el.classList.add('active');
            await new Promise(r => setTimeout(r, 2500));
            el.classList.remove('active');
            await new Promise(r => setTimeout(r, 300));
        }
    }
}
