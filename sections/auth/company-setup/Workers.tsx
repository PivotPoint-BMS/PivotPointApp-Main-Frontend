import React, { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import MotionContainer from '@/components/animate/MotionContainer'
import { varFade } from '@/components/animate/variants'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Scrollbar from '@/components/Scrollbar'

interface WorkersProps {
  handleBack: () => void
  handleNext: () => void
  setFormWorkers: (
    newWorkers: {
      firstName: string
      lastName: string
      email: string
      position: string
    }[]
  ) => void
  formWorkers: {
    firstName: string
    lastName: string
    email: string
    position: string
  }[]
}

export default function Workers({
  handleBack,
  handleNext,
  setFormWorkers,
  formWorkers,
}: WorkersProps) {
  const { t, locale } = useTranslate()
  const [worker, setWorker] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
  })

  const [workers, setWorkers] = useState<
    {
      firstName: string
      lastName: string
      email: string
      position: string
    }[]
  >(formWorkers || [])

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const addWorker = () => {
    if (
      worker.firstName.length > 2 &&
      worker.lastName.length > 2 &&
      emailRegex.test(worker.email) &&
      worker.position.length > 2
    ) {
      setWorkers([...workers, worker])
      setWorker({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
      })
    }
  }

  const removeWorker = (index: number) => {
    setWorkers((prevState) => prevState.filter((w, i) => i !== index))
  }

  return (
    <MotionContainer>
      <div className='container relative mx-auto flex h-full flex-col items-center justify-center gap-5 rounded-xl bg-white px-5 py-10 shadow-md sm:px-16 md:px-20 lg:w-1/2'>
        <IconButton
          onClick={handleBack}
          className={clsx('absolute top-5', locale === 'ar' ? 'right-5' : 'left-5')}
        >
          <Iconify
            icon={
              locale === 'ar'
                ? 'material-symbols:arrow-forward-rounded'
                : 'material-symbols:arrow-back-rounded'
            }
            height={20}
            width={20}
          />
        </IconButton>
        <motion.div
          variants={varFade().in}
          className='flex h-full w-full flex-col items-center gap-6'
        >
          <h1 className='text-3xl font-semibold text-secondary-900'>{t('Add Workers')}</h1>
          <p className='text-center text-gray-600'>{t('Add your workers and their positions')}</p>
          <div className='grid w-full grid-cols-1 items-center justify-between gap-5 md:grid-cols-2'>
            <div className='flex h-full w-full  flex-col items-center gap-6'>
              <TextField
                name='firstName'
                label={t('First name')}
                onChange={(e) =>
                  setWorker((prevWorkers) => ({ ...prevWorkers, [e.target.name]: e.target.value }))
                }
              />
              <TextField
                name='lastName'
                label={t('Last name')}
                onChange={(e) =>
                  setWorker((prevWorkers) => ({ ...prevWorkers, [e.target.name]: e.target.value }))
                }
              />
              <TextField
                name='email'
                label={t('Email')}
                onChange={(e) =>
                  setWorker((prevWorkers) => ({ ...prevWorkers, [e.target.name]: e.target.value }))
                }
              />
              <TextField
                name='position'
                label={t('Position')}
                onChange={(e) =>
                  setWorker((prevWorkers) => ({ ...prevWorkers, [e.target.name]: e.target.value }))
                }
              />
              <Button variant='outlined' className='!px-10' onClick={addWorker}>
                {t('Add')}
              </Button>
            </div>
            <div className='h-full'>
              <h4 className='font-medium'>{t('Workers List')} :</h4>
              <Scrollbar className='p-2' style={{ maxHeight: 400 }}>
                {workers.length === 0 ? (
                  <div className='flex items-center justify-center'>
                    <h6 className='text-lg font-medium text-red-500'>{t('No Worker')}</h6>
                  </div>
                ) : (
                  <div className='flex w-full flex-col items-center gap-3'>
                    {workers.map((w, i) => (
                      <div
                        className='relative flex w-full flex-col gap-1 rounded-md bg-gray-100 p-2'
                        key={i}
                      >
                        <IconButton
                          className='lrt:right-1 absolute top-1 w-fit rtl:left-1'
                          onClick={() => removeWorker(i)}
                        >
                          <Iconify icon='ic:round-person-remove-alt-1' height={16} width={16} />
                        </IconButton>
                        <h6 className='font-medium'>
                          {w.firstName} {w.lastName}
                        </h6>
                        <p className='text-sm'>{w.email}</p>
                        <p className='text-sm'>{w.position}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Scrollbar>
            </div>
          </div>
        </motion.div>
        <Button
          className='w-1/3 self-end'
          onClick={() => {
            setFormWorkers(workers)
            handleNext()
          }}
        >
          {t('Next')}
        </Button>
      </div>
    </MotionContainer>
  )
}
