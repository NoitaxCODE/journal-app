// Version de Fernando
import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: 'dcsvj6xfj',
  api_key: '156322431711395',
  api_secret: 'qIbgL6ZnoQmuzdTLSHGKFDRNYjg',
  secure: true
});

describe('Pruebas en fileUpload', () => { 

  test('debe de subir el archivo correctamente a cloudinary', async () => { 

    const imgUrl = 'https://st3.depositphotos.com/10614052/31663/i/600/depositphotos_316633346-stock-photo-set-of-tasty-italian-pizzas.jpg'
    const resp = await fetch( imgUrl );
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const { secure_url, public_id } = await fileUpload( file ) 

    expect( typeof secure_url ).toBe('string');

    const segments = secure_url.split('/')
    const imageId = segments[ segments.length -1 ].replace('.webp', '')
    
    const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ],{
      resource_type: 'image'
    });

    // console.log(cloudResp)
  });

  test('debe de retornar null', async () => { 

    const file = new File([], 'foto.jpg');
    const url = await fileUpload( file );

    expect( url ).toBe( null );

  })

})