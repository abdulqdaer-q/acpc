import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', path.join(process.cwd(), '.tmp', 'data.db')),
    },
    useNullAsDefault: true,
    debug: false,
  },
});
