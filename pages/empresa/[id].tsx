import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Button,
  useDisclosure,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  
} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from "@nextui-org/react";

import {DatePicker} from "@nextui-org/date-picker";

import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
//Interfaces
interface UsinaColumn {
  key: string;
  label: string;

}
interface Usina {
  id: number;
  descricao: string;
  data: string;
  movimentacao: string;
  favaorecido: string;
  banco: string;
  valor: string;


  
}

interface User {
  id: number;
  nome: string;
  cpf: string;
}

const usinaas = [
  {
      id: 1,
      descricao: "Pagamento de Conta",
      data: "12/12/2021",
      movimentacao: "Débito",
      favaorecido: "12.345.678/0001-00",
      banco: "Banco do Brasil",
      valor: "R$ 100,00"


  },
  {
    id: 2,
      descricao: "Pagamento de Conta",
      data: "12/12/2021",
      movimentacao: "Débito",
      favaorecido: "12.345.678/0001-00",
      banco: "Banco do Brasil",
      valor: "R$ 100,00"

  },
  {
      id: 3,
      descricao: "Pagamento de Conta",
      data: "12/12/2021",
      movimentacao: "Débito",
      favaorecido: "12.345.678/0001-00",
      banco: "Banco do Brasil",
      valor: "R$ 100,00",

  },
  {
    id: 4,
    descricao: "Pagamento de Conta",
    data: "12/12/2021",
    movimentacao: "Débito",
    favaorecido: "12.345.678/0001-00",
    banco: "Banco do Brasil",
    valor: "R$ 100,00",
  },
  {
    id: 5,
    descricao: "Pagamento de Conta",
    data: "12/12/2021",
    movimentacao: "Débito",
    favaorecido: "12.345.678/0001-00",
    banco: "Banco do Brasil",
    valor: "R$ 100,00",
  }
  
 
  // Adicione mais usinas conforme necessário
];
const columns = [
  {
    key: "descricao",
    label: "Descricao",
  },
  
  {
    key: "data",
    label: "data",
  },
  {
    key: "movimentacao",
    label: "Movimentação",
  },
  {
    key: "favaorecido",
    label: "Favorecido",
  },
  {
    key: "banco",
    label: "Banco",
  },
  {
    key: "valor",
    label: "Valor",
  },
  
  {
    key: "actions",
    label: "Ações",
  }
];
const userss = [
  {
    id: 1,
    nome: "Ricardo Sanchez",
    cpf: "123.456.789-00",
  },
  {
    id: 2,
    nome: "Ricardo Sanchez",
    cpf: "123.456.789-00",
  },
  {
    id: 3,
    nome: "Ricardo Sanchez",
    cpf: "123.456.789-00",
  }

]
const INITIAL_VISIBLE_COLUMNS = ["data","descricao", "movimentacao","valor","actions"];
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function App() {
  const [usinas, setUsinas] = useState<Usina[]>(usinaas);
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = useState(1);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState<User[]>(userss)
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "name",
    direction: "ascending",
  });
  const hasSearchFilter = Boolean(filterValue);
  
  
  const headerColumns = React.useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns]);


  const CadastrarUsina = ()=>{
    const usina = {
      id: usinas.length + 1,
      descricao: "Pagamento de Conta",
      data: "12/12/2021",
      movimentacao: "Débito",
      favaorecido: "12.345.678/0001-00",
      banco: "Banco do Brasil",
      valor: "R$ 100,00",
    }
    setUsinas([...usinas, usina])
    onOpenChange()

    console.log("Cadastrado")
  }
  

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);
  
  
  const filteredItems = React.useMemo(() => {
    let filteredUsinas = [...usinas];

    if (hasSearchFilter) {
      filteredUsinas = filteredUsinas.filter((usina) =>
        usina.descricao.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsinas;
  }, [usinas, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
  
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])
  
  const movimentacao =[
      {
        key:"receita",
        label:"Receita"
      },
      {
        key:"despesa",
        label:"Despesa"
      }
  ]
    
  
  
  
  
  
  
  
  
  const renderCell = React.useCallback((usina: Usina, columnKey:string) => {
    const cellValue = getKeyValue(usina, columnKey);

    switch (columnKey) {
      case "descricao":
        return(
          <Link href="usina/1">
            <div className="flex flex r items-center gap-2">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          </Link>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="md" variant="light">
                  <IoEllipsisVertical color="primary" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Editar</DropdownItem>
                <DropdownItem>Apagar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return <div className="flex flex r items-center gap-2">
        <p className="text-bold text-small capitalize">{cellValue}</p>
      </div>
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex w-full flex-col  pt-10 px-10 gap-4">
        <div className="flex justify-between gap-3 items-end">
        <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Procura pelo Nome..."
            startContent={<FaSearch  />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button size="lg" endContent={<FaChevronDown className="text-small" />} variant="flat">
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {capitalize(column.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" onPress={onOpen} size="lg"   endContent={<FaPlus color="primary"/>}>
            Cadastrar movimentação
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-600 ">Total {usinas.length} movimentações do mês</span>
          <label className="flex items-center text-default-600 ">
           Linhas por página
            <select
              className="bg-transparent outline-none text-default-600 "
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    
  ]);


  return (
    <>

    
    <Table className="px-10" aria-label="tablea de usinas"
    topContent={topContent}
    topContentPlacement="outside"
    sortDescriptor={sortDescriptor}
    onSortChange={setSortDescriptor}
     bottomContent={
      <div className="flex w-full justify-center">
        
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={(page: number) => setPage(page)}
        />
      </div>
    } >
      <TableHeader columns={headerColumns}>
        {(column: UsinaColumn) => <TableColumn className="tableColumnTitle  justify-center" key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"Nenhum Usina encontrada."} items={sortedItems}>
        {(item: Usina) => (
          <TableRow key={item.id}>
            {(columnKey: any) => <TableCell >{renderCell(item,columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
      
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cadastrar Movimentação</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                 
                  label="Descrição"
                  placeholder=""
                  variant="bordered"
                />
               
               <DatePicker label="Data" />
               <Select 
                  label="Selecione o tipo de movimentação" 
                >
                  {movimentacao.map((animal) => (
                    <SelectItem key={animal.key} value={animal.label}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input autoFocus label="Favorecido" variant="bordered" />
                  <Input autoFocus label="Banco" variant="bordered" />
                  <Input autoFocus label="Valor" variant="bordered" />
                
                
                
                
              </ModalBody>
              <ModalFooter>
                
                <Button color="primary" onPress={CadastrarUsina}>
                  Cadastrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


    </>
  );
}
