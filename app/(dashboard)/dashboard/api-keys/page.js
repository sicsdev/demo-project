'use client'
import { createKeyPairs, deleteKeyPairsById, getKeyPairs } from '@/app/API/pages/ApiKeys'
import Button from '@/app/components/Common/Button/Button'
import TextField from '@/app/components/Common/Input/TextField'
import Modal from '@/app/components/Common/Modal/Modal'
import Loading from '@/app/components/Loading/Loading'
import { errorMessage, successMessage } from '@/app/components/Messages/Messages'
import ApiKey from '@/app/components/keyPair/ApiKey'
import RestrictedKey from '@/app/components/keyPair/RestrictedKey'
import StandardKey from '@/app/components/keyPair/StandardKey'
import { EllipsisHorizontalIcon, InformationCircleIcon, KeyIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

const Keys = () => {
  const [loading, setLoading] = useState(true)
  const [createModal, setCreateModal] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [keysData, setKeysData] = useState([])
  const getKeysData = async () => {
    const response = await getKeyPairs()
    if (response && (response?.status === 200 || response?.status === 201)) {
      setKeysData(response.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }
  useEffect(() => {
    getKeysData()
  }, [])
  const deleteKeyRecord = async (id) => {
    const response = await deleteKeyPairsById(id)
    if (response.status == 204 || response.status == 200 || response.status == 201) {
      const filterData = keysData.filter((x) => x.id !== id)
      setKeysData(filterData)
      // successMessage('Key deleted successfully !')
    }

  }
  const handleInputValues = (e) => {
    const { value, name } = e.target
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const submitForm = async () => {
    setBtnLoading(true)
    let payload = {
      name: formData.name,
      api_key: formData.key,
    }
    const response = await createKeyPairs(payload)
    if (response.status === 201 || response.status === 200) {
      getKeysData()
      // successMessage("Key create successfully !")
      setCreateModal(false)
      setBtnLoading(false)  
      setFormData({})
    } else {
      setCreateModal(false)
      errorMessage("Unable to create key !")
      setBtnLoading(false)
      setFormData({})
    }
  }

  const DisablingButton = () => {
    const requiredKeys = ['name', 'key'
    ];
    return requiredKeys.some(
      (key) => !formData[key] || formData[key].trim() === ""
    );
  }
  return (
    <div>
      <div className="border-b border-primary dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <span
              className=" flex justify-start gap-2 items-center cursor-pointer py-2 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
              aria-current="page"
            >
              <KeyIcon className="h-5 w-5 text-gray-500" /> Api keys
            </span>
          </li>
        </ul>
      </div>
      {loading === true ? <Loading /> :
        <div className='my-4'>
          {/* <ApiKey /> */}
          <StandardKey data={keysData} deleteKeyRecord={deleteKeyRecord} setCreateModal={setCreateModal} />
          {/* <RestrictedKey /> */}
        </div>
      }

      {createModal === true && (
        <Modal title={'Add New Key'} show={createModal} setShow={setCreateModal} showCancel={true} className={"w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
          <div>
            <TextField
              onChange={handleInputValues}
              value={formData?.name || ''}
              name="name"
              className="py-3 mt-1"
              title={"Key Name"}
              placeholder={"Enter your key name"}
              type={"text"}
              id={"name"}
            />

          </div>
          <div className='mt-2'>
            <TextField
              onChange={handleInputValues}
              value={formData?.key || ''}
              name="key"
              className="py-3 mt-1"
              title={"Key"}
              placeholder={"Enter your key"}
              type={"text"}
              id={"key"}
            />
          </div>
          <Button type="button" onClick={() => { submitForm() }} className="my-2 inline-block rounded bg-primary px-6 pb-2 pt-2 text-xs font-medium leading-normal text-white disabled:shadow-none  transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a]" disabled={DisablingButton()}>{btnLoading ? <><svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                </svg>
                                                    <span>Loading...</span> </>  : "Save"}</Button>
        </Modal>
      )}

    </div>
  )
}
export default Keys   