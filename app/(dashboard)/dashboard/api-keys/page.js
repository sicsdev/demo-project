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
      successMessage('Key deleted successfully !')
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
    console.log(response)
    if (response.status === 201 || response.status === 200) {
      getKeysData()
      successMessage("Key create successfully !")
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
              className=" flex justify-start gap-2 items-center cursor-pointer p-4 text-primary font-bold border-b-2 border-primary rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
              aria-current="page"
            >
              <KeyIcon className="h-6 w-6 text-gray-500" /> Api keys
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
          <Button type="button" onClick={() => { submitForm() }} className="my-2 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]" disabled={DisablingButton()}>{btnLoading ? "Loading..." : "Save"}</Button>
        </Modal>
      )}

    </div>
  )
}
export default Keys   