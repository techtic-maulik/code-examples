module.exports = {
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'anypol789@gmail.com',
      pass: '{U4oZ47P[0cIG5O'
    }
  },
  defaults: {
    forceEmbeddedImages: true,
    from: '"nest-modules" <modules@nestjs.com>',
  },
  templateDir: './src/common/email-templates'
}