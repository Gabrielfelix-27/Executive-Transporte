import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimePickerProps {
  time?: string;
  onTimeSelect: (time: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minTime?: string;
  interval?: number; // intervalo em minutos
}

export function TimePicker({
  time,
  onTimeSelect,
  placeholder = "Selecionar horário",
  className,
  disabled,
  minTime,
  interval = 15,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedHour, setSelectedHour] = React.useState<string>("");
  const [selectedMinute, setSelectedMinute] = React.useState<string>("");

  // Inicializar hora e minuto selecionados baseado no time prop
  React.useEffect(() => {
    if (time) {
      const [hour, minute] = time.split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
    }
  }, [time]);

  // Gerar lista de horas (00-23)
  const generateHours = () => {
    const hours: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      hours.push(hour.toString().padStart(2, '0'));
    }
    return hours;
  };

  // Gerar lista de minutos baseado no intervalo
  const generateMinutes = () => {
    const minutes: string[] = [];
    for (let minute = 0; minute < 60; minute += interval) {
      minutes.push(minute.toString().padStart(2, '0'));
    }
    return minutes;
  };

  const hours = generateHours();
  const minutes = generateMinutes();

  // Verificar se uma hora específica está desabilitada
  const isHourDisabled = (hour: string) => {
    if (!minTime) return false;
    
    const [minHour] = minTime.split(':');
    return parseInt(hour) < parseInt(minHour);
  };

  // Verificar se um minuto específico está desabilitado
  const isMinuteDisabled = (minute: string, hour: string) => {
    if (!minTime || !hour) return false;
    
    const [minHour, minMinute] = minTime.split(':');
    const currentTime = `${hour}:${minute}`;
    return currentTime < minTime;
  };

  // Lidar com seleção de hora
  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour);
    
    // Se já temos um minuto selecionado, atualizar o time completo
    if (selectedMinute) {
      const newTime = `${hour}:${selectedMinute}`;
      if (!isMinuteDisabled(selectedMinute, hour)) {
        onTimeSelect(newTime);
      }
    }
  };

  // Lidar com seleção de minuto
  const handleMinuteSelect = (minute: string) => {
    setSelectedMinute(minute);
    
    // Se já temos uma hora selecionada, atualizar o time completo
    if (selectedHour) {
      const newTime = `${selectedHour}:${minute}`;
      if (!isMinuteDisabled(minute, selectedHour)) {
        onTimeSelect(newTime);
        setOpen(false);
      }
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(':');
    return `${hour}:${minute}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border-gray-300 rounded-none hover:bg-gray-50 h-10 px-4",
            !time && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? formatTime(time) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-0" align="start">
        <div className="flex h-56">
          {/* Coluna de Horas */}
          <div className="flex-1 border-r">
            <div className="p-1.5 text-center text-xs font-medium text-gray-500 border-b">
              Hora
            </div>
            <ScrollArea className="h-44">
              <div className="p-1">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    variant={selectedHour === hour ? "default" : "ghost"}
                    className={cn(
                      "w-full h-7 text-xs font-normal justify-center mb-0.5",
                      selectedHour === hour && "bg-gray-900 text-white hover:bg-gray-800",
                      isHourDisabled(hour) && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isHourDisabled(hour)}
                    onClick={() => handleHourSelect(hour)}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Coluna de Minutos */}
          <div className="flex-1">
            <div className="p-1.5 text-center text-xs font-medium text-gray-500 border-b">
              Min
            </div>
            <ScrollArea className="h-44">
              <div className="p-1">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    variant={selectedMinute === minute ? "default" : "ghost"}
                    className={cn(
                      "w-full h-7 text-xs font-normal justify-center mb-0.5",
                      selectedMinute === minute && "bg-gray-900 text-white hover:bg-gray-800",
                      isMinuteDisabled(minute, selectedHour) && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isMinuteDisabled(minute, selectedHour)}
                    onClick={() => handleMinuteSelect(minute)}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 