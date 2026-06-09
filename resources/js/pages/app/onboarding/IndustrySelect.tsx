// import { useForm } from '@inertiajs/react';

// export default function IndustrySelect({ industries }) {
//     const { data, setData, post, processing } = useForm({
//         industry_id: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         post('/app/onboarding/industry');
//     };

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-50">
//             <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
//                 <h1 className="mb-4 text-xl font-bold">
//                     Select Your Industry
//                 </h1>

//                 <form onSubmit={submit}>
//                     <select
//                         className="w-full rounded border p-3"
//                         value={data.industry_id}
//                         onChange={(e) =>
//                             setData('industry_id', e.target.value)
//                         }
//                     >
//                         <option value="">Select industry</option>
//                         {industries.map((i) => (
//                             <option key={i.id} value={i.id}>
//                                 {i.name}
//                             </option>
//                         ))}
//                     </select>

//                     <button
//                         disabled={processing}
//                         className="mt-4 w-full rounded bg-yellow-400 p-3 font-semibold"
//                     >
//                         Continue to Dashboard
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


import { useForm } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function IndustrySelect({ industries }) {
    const { data, setData, post, processing } = useForm({
        industry_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/app/onboarding/industry');
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4">
            <Card className="w-full max-w-md border border-gray-100 shadow-lg">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold text-gray-900">
                        Select Your Industry
                    </CardTitle>
                    <CardDescription>
                        Choose the industry that best matches your business
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Select
                                value={data.industry_id}
                                onValueChange={(value) =>
                                    setData('industry_id', value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select industry" />
                                </SelectTrigger>

                                <SelectContent>
                                    {industries.map((i) => (
                                        <SelectItem
                                            key={i.id}
                                            value={String(i.id)}
                                        >
                                            {i.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                            disabled={processing || !data.industry_id}
                        >
                            {processing
                                ? 'Processing...'
                                : 'Continue to Dashboard'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
