import { LoaderFunction, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ValidationError = {
    _errors: string[];
};

type OfertasData = {
    id: ValidationError;
    nombre: ValidationError;
    descripcion: ValidationError;
    fechainicio: ValidationError;
    fechafin: ValidationError;
    descuento: ValidationError;
    estado: ValidationError;
    productos: ValidationError;
    badgepromoid: ValidationError;
    limitecanje: ValidationError;
}

type prod = {
    id: number;
    nombre: string;
}

export const loader: LoaderFunction = async () => {
    const response = await fetch("https://localhost:7268/api/Productos");

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data: prod[] = await response.json();

    return data;
};

const CreateOfferPage = () => {
    const data = useLoaderData() as prod[];

    const fetcher = useFetcher();

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const actionData = fetcher.data as OfertasData | null;

    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-full flex items-center justify-center p-5">
            <fetcher.Form method="POST" action="/ofertas">
                {/* grid para 2 columnas */}
                <div className="grid grid-cols-2 gap-4 mb-5 mt-2">
                    <div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input type="text" id="nombre" placeholder="Nombre" name="nombre" required/>
                            {actionData?.nombre && <p className="text-red-500 text-sm">{actionData.nombre._errors[0]}</p>}
                        </div>
                    </div>
                    <div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="descripcion">Descripcion</Label>
                            <Textarea id="descripcion" placeholder="Descripcion" name="descripcion" required/>
                            {actionData?.descripcion && <p className="text-red-500 text-sm">{actionData.descripcion._errors[0]}</p>}
                        </div>
                    </div>
                </div>
                {/* grid para 2 columnas */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="fechainicio">Fecha de inicio</Label>
                            <Input type="date" id="fechainicio" placeholder="Fecha de inicio" name="fechainicio" required/>
                            {actionData?.fechainicio && <p className="text-red-500 text-sm">{actionData.fechainicio._errors[0]}</p>}
                        </div>
                    </div>
                    <div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="fechafin">Fecha de fin</Label>
                            <Input type="date" id="fechafin" placeholder="Fecha de fin" name="fechafin" required/>
                            {actionData?.fechafin && <p className="text-red-500 text-sm">{actionData.fechafin._errors[0]}</p>}
                        </div>
                    </div>
                </div>
                {/* grid para 2 columnas */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="limitecanje">Limite de canje</Label>
                            <Input type="number" id="limitecanje" placeholder="Limite" name="limitecanje" max={10} min={1} required/>
                            {actionData?.limitecanje && <p className="text-red-500 text-sm">{actionData.limitecanje._errors[0]}</p>}
                        </div>
                    </div>
                    <div className="">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="descuento">Descuento</Label>
                            <Input type="number" id="descuento" placeholder="Descuento" name="descuento" required/>
                            {actionData?.descuento && <p className="text-red-500 text-sm">{actionData.descuento._errors[0]}</p>}
                        </div>
                    </div>
                </div>
                {/* grid para 2 columnas */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                        <Label>Productos</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[140px] justify-between"
                                >
                                    {value
                                        ? data.find((p) => p.id.toString() === value)?.nombre
                                        : "Seleccionar..."}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Buscar..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                            {data.map((pro) => (
                                                <CommandItem
                                                    key={pro.id}
                                                    value={pro.id.toString()}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {pro.nombre}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            value === pro.nombre ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <Label htmlFor="badgepromoid">Badges</Label>
                        <Select required name="badgepromoid">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar Badge" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Badges</SelectLabel>
                                    <SelectItem value="1">bronce</SelectItem>
                                    <SelectItem value="2">plata</SelectItem>
                                    <SelectItem value="3">oro</SelectItem>
                                    <SelectItem value="4">platino</SelectItem>
                                    <SelectItem value="5">star</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {
                    value && (
                        <Input type="hidden" name="productos" value={value}  required/>
                    )
                }

                {/* Grid para 2 columnas con los botones crear y limpiar */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Button type="submit" variant="create" disabled={fetcher.state !== "idle"}>
                            Crear
                        </Button>
                    </div>
                    <div>
                        <Button variant="outline" type="button" onClick={() => navigate("/ofertas")}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </fetcher.Form>

        </div>
    );
};

export default CreateOfferPage;