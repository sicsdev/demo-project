'use client'
import Button from '@/app/components/Common/Button/Button'
import RightSidebar from '@/app/components/Dashboard/AuthLayout/RightSidebar'
import { ChevronLeftIcon, EllipsisVerticalIcon, InboxArrowDownIcon, LinkIcon, PencilIcon, ChatBubbleOvalLeftIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import Modal from '@/app/components/Common/Modal/Modal'
import SelectOption from '@/app/components/Common/Input/SelectOption'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";

const GetStarted = () => {
  const [showHelp, setShowHelp] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [stepModal, setStepModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  return (
    <RightSidebar>
      <>
        <div className='flex justify-between gap-2 items-center'>
          <div className='flex justify-between gap-2 items-center'>
            <Link href={"/dashboard/workflow/workflow-builder"}>
              <div>
                <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
              </div>
            </Link>
            <div className="relative w-[35px] h-[35px] gap-2 rounded-lg">
              <Image
                fill={"true"}
                className="bg-contain mx-auto w-full rounded-lg"
                alt="logo.png"
                src={"https://avatars.slack-edge.com/2023-07-15/5596108693825_4033c7cf684d49edc4d0_192.png"}
              /></div>
            <div>
              <h3 className='text-heading font-bold text-lg'>PTO Request</h3>
              <p className='text-border font-normal text-sm'>Request and manage your team's planned time off</p>
            </div>
          </div>
          <div className='flex justify-between gap-2 items-center'>
            <div><small className='text-xs text-border'>Never Published</small></div>
            <div>
              <Button
                type={"button"}
                onClick={() => setShowPublishModal(true)}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]">
                Publish
              </Button>
            </div>
            <div className='cursor-pointer relative' onClick={() => { setShowHelp(prev => !prev) }}><EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
              {showHelp && (
                <div className="absolute left-[-280px] top-[40px] z-10 bg-[#F8F8F8] divide-y divide-gray-100 min-w-[300px] border border-border rounded-lg shadow w-44 ">
                  <ul className="py-2 text-sm text-gray-700 ">
                    <li className='hover:bg-primary_hover hover:text-white text-heading'>
                      <a href="#" className="block px-4 py-2 ">Settings</a>
                    </li>
                    <li className='hover:bg-primary_hover hover:text-white text-heading'>
                      <a href="#" className="block px-4 py-2 ">View activity log</a>
                    </li>
                    <hr className='h-[0.5px]   border-border' />
                    <li className='hover:bg-primary_hover hover:text-white text-heading my-2'>
                      <a href="#" className="block px-4 py-2 ">Make a copy</a>
                    </li>
                    <hr className='h-[0.5px]   border-border' />

                    <li className='hover:bg-danger hover:text-white text-danger my-2'>
                      <a href="#" className="block px-4 py-2 ">Delete</a>
                    </li>
                    <hr className='h-[0.5px]   border-border' />
                    <li className='hover:bg-primary_hover hover:text-white text-heading'>
                      <a href="#" className="block px-4 py-2 ">Help Center</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='w-[auto] sm:w-[60%] md:w-[60%] lg:w-[60%] mx-auto'>

          <div className='mt-6 border bg-[#F8F8F8] border-border rounded-lg shadow p-5 cursor-pointer group' >
            <div className='flex justify-between gap-2 items-center'>
              <div className='flex justify-between gap-4 items-center'>
                <LinkIcon className="h-5 w-5 text-gray-500 font-semibold" />
                <p className='text-sm font-semibold '>Start from a link in tempo</p></div>
              <Button
                type={"button"}
                onClick={(e) => setEditModal(true)}
                className="inline-block  cursor-pointer group-hover:border p-2 border-border rounded-lg h-[38px] group-hover:shadow]">
                <PencilIcon className="h-5 w-5 font-semibold" />
              </Button>
            </div>
          </div>
          <div className='section-workflow-wrapper'>
            <div className='section-workflow'></div>
            <div className='iconplus  cursor-pointer'> <LinkIcon className="h-5 w-5 text-gray-500 font-semibold" /></div>

            <div className='section-workflow3'></div>
            <div className='section-workflow2'></div>
          </div>
          <div className='border  border-border rounded-lg shadow'>
            <div className=' bg-[#F8F8F8] p-5 cursor-pointer group  rounded-lg' >
              <div className='flex justify-between gap-2 items-center'>
                <div className='flex justify-between gap-4 items-center'>
                  <InboxArrowDownIcon className="h-5 w-5 text-gray-500 font-semibold" />
                  <p className='text-sm font-semibold '>Collect info in a form</p></div>
                <Button
                  type={"button"}
                  onClick={(e) => setEditModal(true)}
                  className="inline-block  cursor-pointer group-hover:border p-2 border-border  h-[38px] group-hover:shadow]">
                  <PencilIcon className="h-5 w-5 font-semibold" />
                </Button>
              </div>
            </div>
            <div className='p-5'>

              <h2 className="mb-2 text-sm font-semibold">Top students:</h2>
              <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
                <li>
                  <span className="font-normal text-sm ">Bonnie Green 70</span>
                </li>
                <li>
                  <span className="font-normal text-sm ">Jese Leos 63</span>
                </li>
                <li>
                  <span className="font-normal text-sm ">Leslie Livingston7</span>
                </li>
              </ol>

            </div>
          </div>
          <div className='section-workflow-wrapper'>
            <div className='section-workflow'></div>
            <div className='iconplus cursor-pointer'> <LinkIcon className="h-5 w-5 text-gray-500 font-semibold" /></div>
            <div className='section-workflow3'></div>
            <div className='section-workflow2'></div>
          </div>
          <div className='border-2 border-dashed  bg-[#F8F8F8] border-primary rounded-lg shadow p-5 cursor-pointer group' >
            <div className='flex justify-between gap-2 items-center'>
              <div className='flex justify-between gap-4 items-center'>
                <LinkIcon className="h-5 w-5 text-gray-500 font-semibold" />
                <p className='text-sm font-semibold'>Your next step goes here</p></div>
              <Button
                type={"button"}
                onClick={(e) => setStepModal(true)}
                className="inline-block  cursor-pointer group-hover:border p-2 border-border rounded-lg h-[38px] group-hover:shadow]">
                <PencilIcon className="h-5 w-5 font-semibold" />
              </Button>
            </div>
          </div>

        </div>
      </>
      {
        showPublishModal &&
        <Modal title={'Your workflow is ready to use'} show={showPublishModal} setShow={setShowPublishModal} showCancel={true} className={"w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
          <div className=''>
            <p><b>Welcome Bot</b> is published and available to use in tempo. Test is out by leaving and then re-joining <b># ads.</b></p>
            <div className='flex justify-between gap-2 items-center mt-5'>
              <div></div>
              <Button
                type={"button"}
                className="inline-block font-bold rounded bg-primary px-8 pb-2 pt-3 text-xs  uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
              >
                Open Workflow
              </Button>
            </div>
          </div>
        </Modal>
      }
      {
        stepModal &&
        <Modal title={'Step Library'} show={stepModal} setShow={setStepModal} showCancel={true} className={"w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
          <div>
            <div className='flex justify-between gap-2 items-center mb-5'>
              <div className='flex justify-between gap-4 items-center'>
                <ChatBubbleOvalLeftIcon className="h-7 w-7 font-semibold" />
                <div>
                  <h4 className='font-bold'>Send a Message</h4>
                  <p>Tempo</p>
                </div>
              </div>
              <div className=''>
                <Button
                  type={"button"}
                  className="focus:outline-none font-normal rounded-md text-sm py-2 px-4 w-full focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black">
                  Add
                </Button>
              </div>
            </div>
            <div className='flex justify-between gap-2 items-center'>
              <div className='flex justify-between gap-4 items-center'>
                <FolderOpenIcon className="h-7 w-7 font-semibold" />
                <div>
                  <h4 className='font-bold'>Send a Form</h4>
                  <p>Tempo</p>
                </div>
              </div>
              <div className=''>
                <Button
                  type={"button"}
                  className="focus:outline-none font-normal rounded-md text-sm py-2 px-4 w-full focus:ring-yellow-300 text-black bg-[#ececf1] hover:text-white hover:bg-black">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      }
      {
        editModal &&
        <Modal title={'Send a Message'} show={editModal} setShow={setEditModal} showCancel={true} className={"w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] my-6 mx-auto sm:max-w-[50%] md:max-w-[50%] lg:max-w-[50%]"} >
          <form>
            <div className="mb-4">
              <SelectOption
                name="role"
                values={[{ name: 'Admin', value: 'ADMINISTRATOR' }, { name: 'Collaborator', value: 'MEMBER' }]}
                title={"Send this message to"}
                id={"role"}
                className="py-3"
              />
            </div>
            <Editor
              // editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorStyle={{ border: "1px solid #C0C0C0", borderBottomRightRadius: "7px", borderBottomLeftRadius: "7px" }}
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
              editorClassName="editorClassName"
            // onEditorStateChange={this.onEditorStateChange}
            />  
            <div className="flex items-center justify-between">
              <Button
                type={"submit"}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white disabled:shadow-none shadow-[0_4px_9px_-4px_#0000ff8a] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_#0000ff8a,0_4px_18px_0_#0000ff8a]"
              >
                Edit
              </Button>
            </div>
          </form>
        </Modal>
      }
    </RightSidebar>
  )
}

export default GetStarted