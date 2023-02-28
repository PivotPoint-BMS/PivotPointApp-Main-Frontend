import { FileRejection } from 'react-dropzone'
// utils
import { fData } from '../../utils/formatNumber'
import Card from '../Card'
// ----------------------------------------------------------------------

interface RejectionFilesProps {
  fileRejections: FileRejection[]
}

export default function RejectionFiles({ fileRejections }: RejectionFilesProps) {
  return (
    <Card className='mt-1 border-red-500 bg-red-500/10 py-px px-[2px]'>
      {fileRejections.map(({ file, errors }) => {
        const { webkitRelativePath, size } = file

        return (
          <div key={webkitRelativePath} className='my-px text-red-500 dark:text-red-400'>
            <p className='text-sm'>
              {webkitRelativePath} - {fData(size)}
            </p>

            {errors.map((error) => (
              <p className='text-sm' key={error.code}>
                - {error.message}
              </p>
            ))}
          </div>
        )
      })}
    </Card>
  )
}
