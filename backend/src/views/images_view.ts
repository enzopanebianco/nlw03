import Image from '../models/Image';
import Images from '../models/Image';

export default {
    render(image: Image) {
        return {
            id:image.id,
            url:`http://192.168.0.20:3333/uploads/${image.path}`,
        };

    },
    renderMany(images: Images[]){
        return images.map(image=>this.render(image))
    }
}