// form
import { useFormContext, Controller } from "react-hook-form"
//
import { UploadAvatar } from "../upload"
import { UploadAvatarProps } from "../upload/UploadAvatar"

// ----------------------------------------------------------------------

interface RHFUploadAvatarProps extends UploadAvatarProps {
  name: string
}

export default function RHFUploadAvatar({ name, ...other }: RHFUploadAvatarProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value

        return (
          <div>
            <UploadAvatar error={checkError} {...other} file={field.value} />
            {checkError && (
              <label className='px-[2px] text-center text-sm text-red-500 dark:text-red-400'>
                {error.message}
              </label>
            )}
          </div>
        )
      }}
    />
  )
}

// // ----------------------------------------------------------------------

// RHFUploadSingleFile.propTypes = {
//   name: PropTypes.string,
// };

// export function RHFUploadSingleFile({ name, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => {
//         const checkError = !!error && !field.value;

//         return (
//           <UploadSingleFile
//             accept="image/*"
//             file={field.value}
//             error={checkError}
//             helperText={
//               checkError && (
//                 <FormHelperText error sx={{ px: 2 }}>
//                   {error.message}
//                 </FormHelperText>
//               )
//             }
//             {...other}
//           />
//         );
//       }}
//     />
//   );
// }

// // ----------------------------------------------------------------------

// RHFUploadMultiFile.propTypes = {
//   name: PropTypes.string,
// };

// export function RHFUploadMultiFile({ name, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => {
//         const checkError = !!error && field.value?.length === 0;

//         return (
//           <UploadMultiFile
//             accept="image/*"
//             files={field.value}
//             error={checkError}
//             helperText={
//               checkError && (
//                 <FormHelperText error sx={{ px: 2 }}>
//                   {error?.message}
//                 </FormHelperText>
//               )
//             }
//             {...other}
//           />
//         );
//       }}
//     />
//   );
// }
