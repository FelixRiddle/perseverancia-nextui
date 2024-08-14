"use server";

import CreateLogForm from "./CreateLogForm";

/**
 * Create personal log
 */
export default async function CreatePersonalLogPage() {
	
    return (
        <div>
            <h1>Create personal log</h1>
            
            <p>Create a new personal log entry</p>
			
			<CreateLogForm />
        </div>
    );
}

