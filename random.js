let md5 = 'b40b956c9ed24e4b3fc1f68cfb5c6e15';
let name = 'Waves.jpg';
let chars = md5 + name;
let filename = '';
for(let i = 0; i < 50; i++){
    filename += chars[Math.floor(Math.random() * chars.length)];
} 
console.log(filename);