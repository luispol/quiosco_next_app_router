import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"
import Heading from '../../../../../components/ui/Heading';
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import EditProductForm from "@/components/products/EditProductForm";

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (!product) {
        notFound()
    }


    return product
}


export default async function EditProductsPages({params}: {params: {id:string}}) {
    
    const product = await getProductById(+params.id)
    
    console.log(product)
    
    return (
        <>
            <Heading>Editar producto: {product.name}</Heading>

            <GoBackButton/>

            <EditProductForm>
                <ProductForm
                    product={product}
                />
            </EditProductForm>
        
        </>
    )
}
