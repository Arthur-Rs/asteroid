# Asteroid

Asteroid is an open source framework for web applications with Deno. Created with the purpose of optimizing the development of web applications and API's. 

## How to use?

Asteroid is intended to be simple and quick to use. Let's look at how to instantiate a server with the asteroid:

``` js 
const serve = asteroid({ port: 3333 })

serve.bootstrap()
```

Simple, isn't it? Now we will do our first Hello World by creating a "GET" route, as in the example below

``` js 
...

serve.get('/', (req, res) => {
  res.send({
    body: "Hello World"
  })
})

serve.bootstrap()
```

Simple and fast :)

*In honor of all the dinosaurs killed in the impact of the asteroid chicxulub.*

**Developed by:** Arthur Reis