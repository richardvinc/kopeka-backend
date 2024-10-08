export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  paginationTokenSecret: process.env.PAGINATION_TOKEN_SECRET,
  imageGeneratorFunctionUrl: process.env.IMAGE_GENERATOR_FUNCTION_URL,
});
