'use client'
import React from 'react'
import FormSection from './_components/FormSection'
import OutputSection from './_components/OutputSection'
import Templates from '@/app/(data)/Templates'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface PROPS{
    params:{
        'template-slug':string
    }
}

const CreateNewContent = (props:PROPS) => {

    const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==props.params['template-slug']);

    const GeneratedAIContent = (formData:any)=>{

    }

  return (
    <div className='p-3'>
        <Link href={'/dashboard'}>
            <Button><ArrowLeft/>Back</Button>
        </Link>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
     {/* form section */}
     <FormSection selectedTemplate={selectedTemplate} userFormInput={(v:any)=>GeneratedAIContent(v)}/>
     {/* output section */}
     <div className='col-span-2'>
     <OutputSection />
     </div>
    </div>
    </div>
    
  )
}

export default CreateNewContent
