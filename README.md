# Asteroid

Asteroid é um framework de código aberto para aplicações web com o Deno. Criado com o proposito de otimizar o desenvolvimento de aplicações web e API's. 

## Como utilizar?

Asteroid tem o intuito de ser simples e rápido de utilizar. Vejamos como instanciar um servidor com o asteroid:

``` js 
const serve = asteroid({ port: 3333 })

serve.listen()
```

Simples, não? Agora iremos fazer o nosso primeiro Hello World criando uma rota do tipo "GET", como no exemplo abaixo

``` js 
...

serve.get('/', (req, res) => {
  res.send({
    body: "Hello World"
  })
})

serve.listen()
```

Simples e rápido :)

*Em homenagem a todos os dinossauros mortos no impacto do asteroide de Chicxulub.*

**Desenvolvido por:** Arthur Reis