const { ApolloServer, gql } = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Arpeggios for the Win',
        tempo: 120,
        keysPlayed: [ 'C4', 'D4', 'E4', 'C4', 'E4', 'D4', 'C4'],
        keysPlayedLength: [ 0.25, 0.125,0.125,0.25,0.25,0.25, 0.25],
        keysPlayedOnset: [0, 0.25, 0.375, 0.5, 0.75, 1, 1]
    },
    {
        id: 2,
        title: 'Minor Victory',
        tempo: 80,
        keysPlayed: [ 'C4', 'D4', 'Eb4', 'C4', 'D4', 'Eb4', 'C5', 'D5', 'Eb5', 'C4'],
        keysPlayedLength: [ 0.25, 0.125,0.125,0.25,0.25,0.33, 0.33, 0.33, 0.25, 0.125],
        keysPlayedOnset: [0, 0.25, 0.375, 0.5, 0.75, 1, 1.33, 1.66, 2, 3]
    },
    {
        id: 3,
        title: 'Fifths to Freedom',
        tempo: 80,
        keysPlayed: [ 'C4', 'G4', 'C4', 'G4', 'Db4', 'Ab4', 'Db4', 'Ab4', 'C5', 'C4'],
        keysPlayedLength: [ 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.25],
        keysPlayedOnset: [0, 0.33, 0.66, 1, 1.33, 2.66, 3, 3.33, 3.66, 4]
    },
    {
        id: 4,
        title: 'Lightening Licks',
        tempo: 280,
        keysPlayed: [ 'E4', 'E4', 'F4', 'G4', 'E4','C4', 'D4', 'D4', 'F4', 'E4', 'D4', 'E5','E5', 'F5', 'G5', 'E5','C5', 'D5', 'D5', 'F5', 'E5', 'D5'],
        keysPlayedLength: [ 0.125,0.125,0.125,0.125, 0.25, 0.125, 0.25, 0.125, 0.125, 0.125, 0.25, 0.125,0.125,0.125,0.125, 0.25, 0.125, 0.25, 0.125, 0.125, 0.125, 0.25],
        keysPlayedOnset: [0, 0.125, 0.25, 0.375, 0.6, 1, 1.13, 1.3, 1.5, 1.75, 2, 2.125, 2.25, 2.375, 2.6, 3, 4.13, 4.3, 4.5, 4.75, 5, 6]
    },
    {
        id: 5,
        title: 'Overlap',
        tempo: 120,
        keysPlayed: [ 'Gb4', 'B4', 'D5', 'Gb4', 'B4', 'D5', 'Gb5', 'B5', 'Gb5', 'D5', 'Gb4', 'B4', 'D5', 'Gb4', 'B4', 'D5', 'Gb5', 'B5', 'Gb5', 'D5', 'B4', 'F#4'],
        keysPlayedLength: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 3, 3],
        keysPlayedOnset: [ 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 12]
    }
];

const typeDefs = gql`
    type Song {
        id: ID!
        title: String
        tempo: Float
        keysPlayed: [String]
        keysPlayedLength: [Float]
        keysPlayedOnset: [Float]
    }

    type Query {
        songs: [Song]
        song: Song
    }

    type Mutation {
        addSong(title: String, tempo: Float, keysPlayed: [String], keysPlayedLength: [Float], keysPlayedOnset: [Float]): Song
        updateSong(id: ID!, title: String, tempo: Float, keysPlayed: [String], keysPlayedLength: [Float], keysPlayedOnset: [Float]): Song
    }
    
`

const resolvers = {
    Query: {
        songs: () => songs,
    },
    Mutation: {
        addSong: (_, { title, tempo, keysPlayed, keysPlayedLength, keysPlayedOnset }) => {
            const newSong = { 
                id: songs.length + 1,
                title,
                tempo,
                keysPlayed,
                keysPlayedLength,
                keysPlayedOnset
            };
            songs.push(newSong);

            return newSong;
        },
        updateSong: (_, { id, title, tempo, keysPlayed, keysPlayedLength, keysPlayedOnset }) => {
            let songIndexToUpdate = songs.findIndex(x => x.id == id);

            let updatedState = {
                id,
                title,
                tempo,
                keysPlayed,
                keysPlayedLength,
                keysPlayedOnset
            }

            songs[songIndexToUpdate] = updatedState

            return updatedState;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Apollo server running: ${url}`);
});
