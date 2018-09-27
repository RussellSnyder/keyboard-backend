const { ApolloServer, gql } = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Arpeggios for the Win',
        tempo: '120',
        keysPlayed: [ 'C4', 'D4', 'E4', 'C4', 'E4', 'D4', 'C4'],
        keysPlayedLength: [ '4n', '8n','8n','4n','4n','4n', '4n'],
    },
    {
        id: 2,
        title: 'Minor Victory',
        tempo: '160',
        keysPlayed: [ 'C4', 'D4', 'Eb4', 'C4', 'D4', 'Eb4', 'C5', 'D5', 'Eb5', 'C4'],
        keysPlayedLength: [ '4n', '8n','8n','4n','4n','4t', '4t', '4t', '4n', '8n'],
    },
    {
        id: 3,
        title: 'Fifths to Freedom',
        tempo: '80',
        keysPlayed: [ 'C4', 'G4', 'C4', 'G4', 'Db4', 'Ab4', 'Db4', 'Ab4', 'C5', 'C4'],
        keysPlayedLength: [ '4t', '4t', '4t', '4t', '4t', '4t', '4t', '4t', '4t', '4n'],
    },
    {
        id: 4,
        title: 'Lightening Licks',
        tempo: '280',
        keysPlayed: [ 'E4', 'E4', 'F4', 'G4', 'E4','C4', 'D4', 'D4', 'F4', 'E4', 'D4', 'E5','E5', 'F5', 'G5', 'E5','C5', 'D5', 'D5', 'F5', 'E5', 'D5'],
        keysPlayedLength: [ '8n','8n','8n','8n', '4n', '8n', '4n', '8n', '8n', '8n', '4n', '8n','8n','8n','8n', '4n', '8n', '4n', '8n', '8n', '8n', '4n'],
    }
];

const typeDefs = gql`
    type Song {
        id: ID!
        title: String
        tempo: String
        keysPlayed: [String]
        keysPlayedLength: [String]
    }

    type Query {
        songs: [Song]
        song: Song
    }

    type Mutation {
        addSong(title: String, tempo: String, keysPlayed: [String], keysPlayedLength: [String]): Song
        updateSong(id: ID!, title: String, tempo: String, keysPlayed: [String], keysPlayedLength: [String]): Song
    }
    
`

const resolvers = {
    Query: {
        songs: () => songs,
    },
    Mutation: {
        addSong: (_, { title, tempo, keysPlayed, keysPlayedLength }) => {
            const newSong = { 
                id: songs.length + 1,
                title,
                tempo,
                keysPlayed,
                keysPlayedLength
            };
            songs.push(newSong);

            return newSong;
        },
        updateSong: (_, { id, title, tempo, keysPlayed, keysPlayedLength }) => {
            let songIndexToUpdate = songs.findIndex(x => x.id == id);

            let updatedState = {
                id,
                title,
                tempo,
                keysPlayed,
                keysPlayedLength
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
