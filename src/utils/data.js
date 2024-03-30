import bcrypt from 'bcryptjs'
const data = { 
  users:[
    {
      name: "Tahiru",
      email: "tahirumustapha13@gmail.com",
      password:bcrypt.hashSync('123456'),
      isAdmin:true,
    },
    {
      name: "Hajara",
      email: "hajaramustapha24@gmail.com",
      password:bcrypt.hashSync('123456'),
      isAdmin:false,
    },
  ],
   products: [
      {
        name:'Free T-shirt',
        slug: 'free t-shirt',
        category: 'Shirts',
        image: '/images/shirt1.jpg',
        price:'70',
        rating:'4.5',
        brand:'Adidas',
        numReviews:'8',
        countInStock:20,
        description:'A popular shirt'

      },
      {
        name:'Free Fleet-shirt',
        slug: 'free fleet-shirt',
        category: 'Shirts',
        image: '/images/shirt2.jpg',
        price:'70',
        rating:'4.5',
        brand:'Nike',
        numReviews:'8',
        countInStock:20,
        description:'A popular shirt'

      },
      {
        name:'Fit Pants',
        slug: 'free fit pants',
        category: 'Pants',
        image: '/images/pants3.jpg',
        price:'70',
        rating:'4.5',
        brand:'Raymon',
        numReviews:'8',
        countInStock:20,
        description:'A popular fit pants'

      },
      {
        name:'Golf Pants',
        slug: 'golf pants',
        category: 'Pants',
        image: '/images/pants2.jpg',
        price:'70',
        rating:'4.5',
        brand:'Oliver',
        numReviews:'8',
        countInStock:20,
        description:'Smart looking pants'

      },
      {
        name:'Golf Pans',
        slug: 'fit pans',
        category: 'golf pants ',
        image: '/images/pants1.jpg',
        price:'70',
        rating:'4.5',
        brand:'Raymon',
        numReviews:'8',
        countInStock:20,
        description:'A popular golf pants'

      },
      {
        name:'Slim Shirt',
        slug: 'free slim-shirt',
        category: 'Shirts',
        image: '/images/shirt3.jpg',
        price:'70',
        rating:'4.5',
        brand:'Raymon',
        numReviews:'8',
        countInStock:20,
        description:'A popular shirt'

      },
     
   ],
};
export default data;