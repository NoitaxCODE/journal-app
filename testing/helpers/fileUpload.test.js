// Cree dos archivos de pruebas iguales, este lo hice a mi manera,
// utilizando mi funcion deleteImgs para borrar las imagenes despues
// de subirlas. Ya que por cada test que hago se sube una imagen a cloudinary
// Fernando hace lo mismo pero de otra manera


import { deleteImgs } from "../../src/helpers/deleteImgs";
import { fileUpload } from "../../src/helpers/fileUpload";

describe('Pruebas en fileUpload', () => { 

  test('debe de subir el archivo correctamente a cloudinary', async () => { 

    const imgUrl = 'https://st3.depositphotos.com/10614052/31663/i/600/depositphotos_316633346-stock-photo-set-of-tasty-italian-pizzas.jpg'
    const resp = await fetch( imgUrl );
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const { secure_url, public_id } = await fileUpload( file ) 

    expect( typeof secure_url ).toBe('string');

    await deleteImgs( public_id )

  });

  test('debe de retornar null', async () => { 

    const file = new File([], 'foto.jpg');
    const url = await fileUpload( file );

    expect( url ).toBe( null );

  })

})