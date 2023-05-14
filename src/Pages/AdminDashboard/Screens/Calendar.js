import { Calendar } from 'antd';

export default function CalendarPage(props) {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
    return (
        <>
            <Calendar onPanelChange={onPanelChange} />
        </>
    );
}
