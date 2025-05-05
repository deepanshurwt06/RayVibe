export default function SummaryHeader({ title }: { title: string } ) {
    console.log("this is summary text",title);
    
    return (
        <h1>{title || 'No title'}</h1>
    );
}