// import { CloseOutlined } from '@ant-design/icons'
// import { doc } from 'firebase/firestore'
// import Image from 'next/image'
// import { useDocumentData } from 'react-firebase-hooks/firestore'
// import { firestore } from '../../lib/firebase'
// import { Product } from '../../lib/types/products/product.interface'
// import Loader from '../../../components/Loader'

// type ProductDialogProps = {
//   productID: string
//   close: VoidFunction
// }

// export default function ProductDialog({
//   productID,
//   close,
// }: ProductDialogProps) {
//   const [data, loading, error] = useDocumentData(
//     doc(firestore, `products/${productID}`)
//   )
//   const product = data as Product

//   if (error) {
//     console.error(error)
//   }

//   if (loading) {
//     return <Loader loading={true} />
//   }

//   return (
//     <section>
//       <div className='p-6 bg-green-1000 rounded-t-2xl flex items-center'>
//         <h3 className='text-white text-lg font-bold grow'>{product.name}</h3>
//         <div className='w-4'>
//           <CloseOutlined className='text-white text-base' onClick={close} />
//         </div>
//       </div>
//       <div>
//         <div className='px-6 py-4 flex flex-col items-center'>
//           <div className='border-4 border-slate-300 border-solid h-32 w-32'>
//             <Image
//               src={product.pictures}
//               width='128'
//               height='128'
//               alt={product.name}
//             />
//           </div>
//           <p>{product.description}</p>
//         </div>
//       </div>
//     </section>
//   )
// }
