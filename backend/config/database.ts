import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'better-sqlite3',
    connection: {
      filename: path.join(
        __dirname,
        '..',
        env('DATABASE_FILENAME', '.tmp/data.db')
      ),
    },
    useNullAsDefault: true,
  },
});
